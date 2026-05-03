import { useState, useEffect, useRef } from 'react'
import { TOPIC, EXAM_TITLE } from './config.js'
import { sendToSheet } from './sheets.js'

// ─── Config ───────────────────────────────────────────────────────────────────
const EXAM_DURATION_SEC = 75 * 60  // 75 minutes

// ─── Dynamically load questions ───────────────────────────────────────────────
const topicModules = import.meta.glob('./questions/*.js', { eager: true })
const mod = topicModules[`./questions/${TOPIC}.js`]
const SECTIONS = mod ? mod.SECTIONS : []
if (!mod) console.error(`No question file found for topic: "${TOPIC}". Create src/questions/${TOPIC}.js`)

const allQ = SECTIONS.flatMap(sec =>
  sec.questions.map(q => ({ ...q, secId: sec.id, secLabel: sec.label, secColor: sec.color }))
)
const sectionStartIdx = {}
let _off = 0
SECTIONS.forEach(sec => { sectionStartIdx[sec.id] = _off; _off += sec.questions.length })

// ─── localStorage helpers ─────────────────────────────────────────────────────
const STORE_KEY = (name) => `exam_${TOPIC}_${name.trim().toLowerCase().replace(/\s+/g, '_')}`
function loadHistory(name) {
  try { return JSON.parse(localStorage.getItem(STORE_KEY(name)) || '[]') } catch { return [] }
}
function saveResult(name, result) {
  const h = loadHistory(name); h.unshift(result)
  localStorage.setItem(STORE_KEY(name), JSON.stringify(h.slice(0, 20)))
}

// ─── Timer helper ─────────────────────────────────────────────────────────────
function formatTime(sec) {
  const m = Math.floor(sec / 60), s = sec % 60
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

// ─── Shared styles (LIGHT THEME) ─────────────────────────────────────────────
const C = {
  bg:        '#f8fafc',   // page background
  surface:   '#ffffff',   // cards, sidebar
  border:    '#e2e8f0',   // borders
  text:      '#1e293b',   // primary text
  muted:     '#64748b',   // secondary text
  subtle:    '#f1f5f9',   // hover, subtle bg
  accent:    '#3b5bdb',   // primary blue
  green:     '#16a34a',
  red:       '#dc2626',
  yellow:    '#d97706',
  greenBg:   '#f0fdf4',
  redBg:     '#fff1f2',
  greenBdr:  '#86efac',
  redBdr:    '#fecaca',
}

const S = {
  card: {
    background: C.surface, border: `1px solid ${C.border}`,
    borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
  },
  btn: (color = C.accent) => ({
    background: color, color: '#fff', border: 'none', borderRadius: 8,
    padding: '11px 24px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
  }),
  ghost: {
    background: C.surface, color: C.muted, border: `1px solid ${C.border}`,
    borderRadius: 8, padding: '10px 20px', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit'
  }
}

const TOTAL_Q = allQ.length

// ─── SCREEN: Login ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [name, setName] = useState('')
  const [err, setErr]   = useState('')

  function handleStart() {
    const t = name.trim()
    if (t.length < 2) { setErr('Please enter your full name (at least 2 characters).'); return }
    onLogin(t)
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ ...S.card, maxWidth: 460, width: '100%', textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 56, marginBottom: 10 }}>🐍</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, marginBottom: 6 }}>{EXAM_TITLE}</h1>
        <p style={{ color: C.muted, fontSize: 14, marginBottom: 6 }}>
          {SECTIONS.length} topics &nbsp;·&nbsp; {TOTAL_Q} questions
        </p>
        <p style={{ color: C.muted, fontSize: 13, marginBottom: 32 }}>
          ⏱ Time allowed: <strong style={{ color: C.text }}>75 minutes</strong>
        </p>

        <div style={{ textAlign: 'left', marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600, color: C.text }}>
            Your full name
          </label>
          <input
            autoFocus value={name}
            onChange={e => { setName(e.target.value); setErr('') }}
            onKeyDown={e => e.key === 'Enter' && handleStart()}
            placeholder="e.g. Priya Sharma"
            style={{
              width: '100%', padding: '13px 16px', fontSize: 16,
              background: C.surface, border: `1.5px solid ${err ? C.red : C.border}`,
              borderRadius: 8, color: C.text, outline: 'none', fontFamily: 'inherit'
            }}
          />
          {err && <p style={{ color: C.red, fontSize: 13, marginTop: 6 }}>{err}</p>}
        </div>

        <button style={{ ...S.btn(), width: '100%', padding: '14px', fontSize: 16 }} onClick={handleStart}>
          Start Exam →
        </button>

        <div style={{ marginTop: 24, padding: '14px 16px', background: C.subtle, borderRadius: 8, textAlign: 'left' }}>
          <p style={{ fontSize: 13, color: C.muted, marginBottom: 4 }}>📌 <strong style={{ color: C.text }}>Before you begin:</strong></p>
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
            • Answers are revealed only after you submit the full exam<br />
            • You can skip and return to questions using the sidebar<br />
            • Timer starts when you click Start — auto-submits at 0:00
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── SCREEN: Exam ─────────────────────────────────────────────────────────────
function ExamScreen({ studentName, onFinish }) {
  const [idx, setIdx]                   = useState(0)
  const [selected, setSelected]         = useState(null)
  // selectedAnswers[i] = option index chosen, or null
  const [selectedAnswers, setSelectedAnswers] = useState(Array(allQ.length).fill(null))
  // skipped[i] = true if skipped
  const [skipped, setSkipped]           = useState(Array(allQ.length).fill(false))
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [sidebarOpen, setSidebarOpen]   = useState(true)
  const [timeLeft, setTimeLeft]         = useState(EXAM_DURATION_SEC)
  const timerRef                        = useRef(null)
  const autoSubmitted                   = useRef(false)

  const current  = allQ[idx]
  const answered = selectedAnswers.filter(a => a !== null).length

  // ── Timer ──
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          if (!autoSubmitted.current) { autoSubmitted.current = true; handleSubmit(true) }
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  const timerColor = timeLeft <= 300 ? C.red : timeLeft <= 600 ? C.yellow : C.green
  const timerBg    = timeLeft <= 300 ? '#fff1f2' : timeLeft <= 600 ? '#fffbeb' : '#f0fdf4'

  // ── Dot status ──
  function qStatus(i) {
    if (i === idx) return 'current'
    if (skipped[i]) return 'skipped'
    if (selectedAnswers[i] !== null) return 'answered'
    return 'unanswered'
  }
  const dotStyle = {
    current:    { bg: C.accent,  color: '#fff',    border: C.accent },
    answered:   { bg: '#dbeafe', color: C.accent,  border: C.accent },
    skipped:    { bg: '#fef9c3', color: C.yellow,  border: C.yellow },
    unanswered: { bg: C.subtle,  color: C.muted,   border: C.border },
  }

  function selectOption(i) { setSelected(i) }

  function goNext() {
    // save selection
    const newSel = [...selectedAnswers]
    if (selected !== null) newSel[idx] = selected
    setSelectedAnswers(newSel)
    if (idx + 1 < allQ.length) { setIdx(idx + 1); setSelected(newSel[idx + 1]) }
  }

  function goPrev() {
    const newSel = [...selectedAnswers]
    if (selected !== null) newSel[idx] = selected
    setSelectedAnswers(newSel)
    if (idx > 0) { setIdx(idx - 1); setSelected(newSel[idx - 1]) }
  }

  function skipQuestion() {
    const newSkip = [...skipped]; newSkip[idx] = true; setSkipped(newSkip)
    const newSel  = [...selectedAnswers]; newSel[idx] = null; setSelectedAnswers(newSel)
    setSelected(null)
    if (idx + 1 < allQ.length) setIdx(idx + 1)
    else setShowSubmitModal(true)
  }

  function jumpTo(i) {
    const newSel = [...selectedAnswers]
    if (selected !== null) newSel[idx] = selected
    setSelectedAnswers(newSel)
    setIdx(i); setSelected(newSel[i])
  }

  function handleSubmit(auto = false) {
    clearInterval(timerRef.current)
    const finalSel = [...selectedAnswers]
    if (!auto && selected !== null) finalSel[idx] = selected

    const topicBreakdown = {}
    allQ.forEach((q, i) => {
      if (!topicBreakdown[q.secId]) topicBreakdown[q.secId] = { label: q.secLabel, correct: 0, total: 0 }
      const isCorrect = finalSel[i] === q.answer
      topicBreakdown[q.secId].correct += isCorrect ? 1 : 0
      topicBreakdown[q.secId].total   += 1
    })

    const totalCorrect = allQ.filter((q, i) => finalSel[i] === q.answer).length
    const result = {
      date: new Date().toLocaleString('en-IN'),
      total: TOTAL_Q, correct: totalCorrect,
      pct: Math.round((totalCorrect / TOTAL_Q) * 100),
      topics: topicBreakdown,
      finalAnswers: finalSel,   // store for review
      autoSubmitted: auto,
      timeTaken: EXAM_DURATION_SEC - timeLeft,
    }
    saveResult(studentName, result)
    sendToSheet(studentName, result)
    onFinish(result)
  }

  const unansweredCount = selectedAnswers.filter(a => a === null).length

  const optStyle = (i) => {
    const isSelected = selected === i
    return {
      width: '100%', textAlign: 'left', padding: '14px 18px', marginBottom: 10,
      background: isSelected ? '#eff6ff' : C.surface,
      border: `2px solid ${isSelected ? C.accent : C.border}`,
      borderRadius: 8, color: C.text, cursor: 'pointer',
      fontSize: 16, fontFamily: 'inherit', transition: 'all 0.12s',
      display: 'flex', alignItems: 'flex-start', gap: 12,
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' }}>

      {/* ── HEADER ── */}
      <header style={{
        background: C.surface, borderBottom: `1px solid ${C.border}`,
        padding: '0 20px', height: 56, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
      }}>
        {/* Left: toggle + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setSidebarOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: C.muted, padding: 4 }}>
            ☰
          </button>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{EXAM_TITLE}</div>
            <div style={{ fontSize: 12, color: C.muted }}>{studentName}</div>
          </div>
        </div>

        {/* Centre: Q number + progress */}
        <div style={{ flex: 1, maxWidth: 340, margin: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: C.muted }}>Question {idx + 1} of {TOTAL_Q}</span>
            <span style={{ fontSize: 12, color: C.muted }}>{answered} answered</span>
          </div>
          <div style={{ background: C.subtle, borderRadius: 4, height: 5 }}>
            <div style={{
              background: current.secColor, height: 5, borderRadius: 4,
              width: `${(answered / TOTAL_Q) * 100}%`, transition: 'width 0.3s'
            }} />
          </div>
        </div>

        {/* Right: timer + submit */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            background: timerBg, border: `1.5px solid ${timerColor}`,
            borderRadius: 8, padding: '5px 14px', fontFamily: 'JetBrains Mono, monospace',
            fontSize: 16, fontWeight: 700, color: timerColor, minWidth: 80, textAlign: 'center'
          }}>
            {formatTime(timeLeft)}
          </div>
          <button style={{ ...S.btn(C.red), padding: '7px 16px', fontSize: 13 }}
            onClick={() => setShowSubmitModal(true)}>
            Submit
          </button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* SIDEBAR */}
        {sidebarOpen && (
          <aside style={{
            width: 230, minWidth: 230, background: C.surface,
            borderRight: `1px solid ${C.border}`, padding: '16px 12px',
            overflowY: 'auto', position: 'sticky', top: 56,
            height: 'calc(100vh - 56px)'
          }}>
            {SECTIONS.map(sec => {
              const start   = sectionStartIdx[sec.id]
              const secQs   = sec.questions
              const secDone = secQs.filter((_, i) => selectedAnswers[start + i] !== null).length
              return (
                <div key={sec.id} style={{ marginBottom: 20 }}>
                  <button onClick={() => jumpTo(start)} style={{
                    width: '100%', textAlign: 'left', background: 'none', border: 'none',
                    cursor: 'pointer', padding: '4px 0', marginBottom: 8
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: sec.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {sec.label}
                    </div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                      {secDone}/{secQs.length} answered
                    </div>
                  </button>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {secQs.map((_, i) => {
                      const qi  = start + i
                      const st  = qStatus(qi)
                      const ds  = dotStyle[st]
                      return (
                        <button key={i} onClick={() => jumpTo(qi)} title={`Q${qi + 1}`} style={{
                          width: 28, height: 28, borderRadius: 6,
                          background: ds.bg, color: ds.color,
                          border: `1.5px solid ${ds.border}`,
                          fontSize: 11, fontWeight: 700, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {qi + 1}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Legend */}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, marginTop: 4 }}>
              {[
                [C.accent,  '#dbeafe', 'Answered'],
                [C.yellow,  '#fef9c3', 'Skipped'],
                [C.border,  C.subtle,  'Not visited'],
              ].map(([bdr, bg, lbl]) => (
                <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                  <div style={{ width: 14, height: 14, borderRadius: 4, background: bg, border: `1.5px solid ${bdr}` }} />
                  <span style={{ fontSize: 12, color: C.muted }}>{lbl}</span>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* QUESTION AREA */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 24px 80px' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>

            {/* Section pill + Q number */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{
                fontSize: 12, fontWeight: 600, color: current.secColor,
                background: `${current.secColor}18`, border: `1px solid ${current.secColor}44`,
                borderRadius: 20, padding: '3px 12px'
              }}>
                {current.secLabel}
              </span>
              <span style={{ fontSize: 13, color: C.muted }}>
                Question <strong style={{ color: C.text }}>{idx + 1}</strong> of <strong style={{ color: C.text }}>{TOTAL_Q}</strong>
              </span>
            </div>

            {/* Question card */}
            <div style={{ ...S.card, marginBottom: 16 }}>
              <p style={{
                fontSize: 17, fontWeight: 600, color: C.text,
                lineHeight: 1.75, whiteSpace: 'pre-wrap', marginBottom: 24,
                fontFamily: 'JetBrains Mono, monospace'
              }}>
                {current.q}
              </p>

              {current.options.map((opt, i) => (
                <button key={i} style={optStyle(i)} onClick={() => selectOption(i)}>
                  {/* Option label circle */}
                  <span style={{
                    minWidth: 28, height: 28, borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700,
                    background: selected === i ? C.accent : C.subtle,
                    color: selected === i ? '#fff' : C.muted,
                    flexShrink: 0, marginTop: 1
                  }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ fontSize: 16, lineHeight: 1.5 }}>{opt}</span>
                </button>
              ))}
            </div>

            {/* Navigation buttons */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button style={{ ...S.ghost, opacity: idx === 0 ? 0.4 : 1 }} onClick={goPrev} disabled={idx === 0}>
                ← Previous
              </button>
              <button style={{ ...S.ghost }} onClick={skipQuestion}>
                Skip
              </button>
              <div style={{ flex: 1 }} />
              {idx + 1 < TOTAL_Q
                ? <button style={{ ...S.btn() }} onClick={goNext}>
                    Save & Next →
                  </button>
                : <button style={{ ...S.btn(C.green) }} onClick={() => setShowSubmitModal(true)}>
                    Review & Submit →
                  </button>
              }
            </div>

          </div>
        </main>
      </div>

      {/* ── SUBMIT MODAL ── */}
      {showSubmitModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20
        }}>
          <div style={{ ...S.card, maxWidth: 440, width: '100%', textAlign: 'center', padding: 36 }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>📋</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 8 }}>Submit Exam?</h3>
            <p style={{ color: C.muted, fontSize: 15, marginBottom: 12 }}>
              You have answered <strong style={{ color: C.text }}>{answered}</strong> of <strong style={{ color: C.text }}>{TOTAL_Q}</strong> questions.
            </p>
            {unansweredCount > 0 && (
              <div style={{ background: '#fffbeb', border: `1px solid #fde68a`, borderRadius: 8, padding: '10px 14px', marginBottom: 16 }}>
                <p style={{ color: C.yellow, fontSize: 13 }}>
                  ⚠️ {unansweredCount} question{unansweredCount > 1 ? 's' : ''} unanswered — will be marked incorrect.
                </p>
              </div>
            )}
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 24 }}>
              💡 Answers and explanations will be shown after submission.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ ...S.ghost, flex: 1 }} onClick={() => setShowSubmitModal(false)}>
                Continue Exam
              </button>
              <button style={{ ...S.btn(C.red), flex: 1 }} onClick={() => handleSubmit(false)}>
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── SCREEN: Review (shown after submit, before results summary) ───────────────
function ReviewScreen({ studentName, result, onDone }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const q    = allQ[activeIdx]
  const chosen = result.finalAnswers[activeIdx]
  const isCorrect = chosen === q.answer

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{
        background: C.surface, borderBottom: `1px solid ${C.border}`,
        padding: '0 20px', height: 56, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>Exam Review — {studentName}</div>
          <div style={{ fontSize: 12, color: C.muted }}>{result.correct}/{result.total} correct · {result.pct}%</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, color: C.muted }}>Q{activeIdx + 1} of {TOTAL_Q}</span>
          <button style={{ ...S.btn() }} onClick={onDone}>See Score Summary →</button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>

        {/* Sidebar — all questions with correct/wrong dots */}
        <aside style={{
          width: 230, minWidth: 230, background: C.surface, borderRight: `1px solid ${C.border}`,
          padding: '16px 12px', overflowY: 'auto', position: 'sticky', top: 56, height: 'calc(100vh - 56px)'
        }}>
          {SECTIONS.map(sec => {
            const start = sectionStartIdx[sec.id]
            return (
              <div key={sec.id} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: sec.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                  {sec.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {sec.questions.map((_, i) => {
                    const qi  = start + i
                    const ch  = result.finalAnswers[qi]
                    const ok  = ch === allQ[qi].answer
                    const isCur = qi === activeIdx
                    return (
                      <button key={i} onClick={() => setActiveIdx(qi)} title={`Q${qi+1}`} style={{
                        width: 28, height: 28, borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isCur ? C.accent : ok ? C.greenBg : ch === null ? C.subtle : C.redBg,
                        color: isCur ? '#fff' : ok ? C.green : ch === null ? C.muted : C.red,
                        border: `1.5px solid ${isCur ? C.accent : ok ? C.green : ch === null ? C.border : C.red}`
                      }}>
                        {qi + 1}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
          {/* Legend */}
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
            {[[C.green, C.greenBg, '✓ Correct'],[C.red, C.redBg, '✗ Wrong'],[C.border, C.subtle, '— Skipped']].map(([bdr,bg,lbl]) => (
              <div key={lbl} style={{ display:'flex', alignItems:'center', gap:7, marginBottom:6 }}>
                <div style={{ width:14, height:14, borderRadius:4, background:bg, border:`1.5px solid ${bdr}` }} />
                <span style={{ fontSize:12, color:C.muted }}>{lbl}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Review question */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 24px 80px' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: q.secColor, background: `${q.secColor}18`, border: `1px solid ${q.secColor}44`, borderRadius: 20, padding: '3px 12px' }}>
                {q.secLabel}
              </span>
              <span style={{ fontSize: 13, color: C.muted }}>Question <strong style={{ color: C.text }}>{activeIdx + 1}</strong> of <strong style={{ color: C.text }}>{TOTAL_Q}</strong></span>
            </div>

            <div style={{ ...S.card, marginBottom: 14 }}>
              <p style={{ fontSize: 17, fontWeight: 600, color: C.text, lineHeight: 1.75, whiteSpace: 'pre-wrap', marginBottom: 24, fontFamily: 'JetBrains Mono, monospace' }}>
                {q.q}
              </p>
              {q.options.map((opt, i) => {
                const isAnswer   = i === q.answer
                const isChosen   = i === chosen
                let bg = C.surface, border = C.border, color = C.text, icon = null
                if (isAnswer)               { bg = C.greenBg; border = C.green;  color = C.green;  icon = '✓' }
                else if (isChosen && !isAnswer) { bg = C.redBg;   border = C.red;   color = C.red;    icon = '✗' }
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12, padding: '13px 16px',
                    marginBottom: 10, background: bg, border: `2px solid ${border}`,
                    borderRadius: 8, fontSize: 16, color
                  }}>
                    <span style={{
                      minWidth: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700, background: isAnswer ? C.green : isChosen ? C.red : C.subtle,
                      color: (isAnswer || isChosen) ? '#fff' : C.muted, flexShrink: 0, marginTop: 1
                    }}>
                      {icon || String.fromCharCode(65 + i)}
                    </span>
                    <span style={{ flex: 1, lineHeight: 1.5 }}>{opt}</span>
                  </div>
                )
              })}
            </div>

            {/* Explanation */}
            <div style={{
              background: isCorrect ? C.greenBg : C.redBg,
              border: `1px solid ${isCorrect ? C.green : C.red}`,
              borderRadius: 10, padding: '14px 18px', fontSize: 15, lineHeight: 1.7, marginBottom: 20
            }}>
              <strong style={{ color: isCorrect ? C.green : C.red }}>
                {chosen === null ? '— Skipped. ' : isCorrect ? '✓ Correct! ' : '✗ Incorrect. '}
              </strong>
              <span style={{ color: C.text }}>{q.explain}</span>
            </div>

            {/* Prev / Next */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ ...S.ghost, opacity: activeIdx === 0 ? 0.4 : 1 }}
                onClick={() => activeIdx > 0 && setActiveIdx(activeIdx - 1)}>← Previous</button>
              <div style={{ flex: 1 }} />
              {activeIdx < TOTAL_Q - 1
                ? <button style={S.btn()} onClick={() => setActiveIdx(activeIdx + 1)}>Next →</button>
                : <button style={S.btn(C.green)} onClick={onDone}>See Score Summary →</button>
              }
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// ─── SCREEN: Results ──────────────────────────────────────────────────────────
function ResultsScreen({ studentName, result, onViewHistory, onRetake, onReview }) {
  const pct   = result.pct
  const grade = pct >= 90 ? { label: 'Excellent 🏆', color: '#16a34a' }
              : pct >= 75 ? { label: 'Good 👍',       color: '#2563eb' }
              : pct >= 60 ? { label: 'Pass 📘',        color: '#d97706' }
              : { label: 'Needs Work 💪',              color: '#dc2626' }

  const [syncStatus, setSyncStatus] = useState('sending')
  useEffect(() => { const t = setTimeout(() => setSyncStatus('done'), 3000); return () => clearTimeout(t) }, [])

  const mins = result.timeTaken ? Math.floor(result.timeTaken / 60) : null
  const secs = result.timeTaken ? result.timeTaken % 60 : null

  return (
    <div style={{ minHeight: '100vh', background: C.bg, padding: '32px 20px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        {/* Score hero */}
        <div style={{ ...S.card, textAlign: 'center', marginBottom: 20, padding: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 4 }}>{studentName}'s Result</h2>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 24 }}>{result.date}{result.autoSubmitted ? ' · Auto-submitted (time up)' : ''}</p>

          <div style={{ fontSize: 64, fontWeight: 800, color: grade.color, lineHeight: 1 }}>{pct}%</div>
          <div style={{ color: grade.color, fontSize: 18, fontWeight: 600, marginTop: 8, marginBottom: 6 }}>{grade.label}</div>
          <div style={{ color: C.muted, fontSize: 15, marginBottom: 8 }}>{result.correct} / {result.total} correct</div>
          {mins !== null && (
            <div style={{ color: C.muted, fontSize: 13 }}>⏱ Time taken: {mins}m {secs}s</div>
          )}
          <div style={{ marginTop: 14, fontSize: 13, color: syncStatus === 'sending' ? C.muted : C.green }}>
            {syncStatus === 'sending' ? '⏳ Sending score to teacher…' : '✓ Score sent to teacher'}
          </div>
        </div>

        {/* Topic breakdown */}
        <div style={{ ...S.card, marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 18 }}>Topic Breakdown</h3>
          {Object.values(result.topics).map(t => {
            const tp = Math.round((t.correct / t.total) * 100)
            return (
              <div key={t.label} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{t.label}</span>
                  <span style={{ fontSize: 13, color: C.muted }}>{t.correct}/{t.total} — <strong style={{ color: tp >= 80 ? C.green : tp >= 60 ? C.yellow : C.red }}>{tp}%</strong></span>
                </div>
                <div style={{ background: C.subtle, borderRadius: 4, height: 8 }}>
                  <div style={{
                    height: 8, borderRadius: 4, width: `${tp}%`,
                    background: tp >= 80 ? C.green : tp >= 60 ? C.yellow : C.red, transition: 'width 0.6s'
                  }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button style={{ ...S.btn(), flex: 1 }} onClick={onReview}>Review Answers</button>
          <button style={{ ...S.btn('#0f766e'), flex: 1 }} onClick={onViewHistory}>My History</button>
          <button style={{ ...S.ghost, flex: 1 }} onClick={onRetake}>Retake Exam</button>
        </div>
      </div>
    </div>
  )
}

// ─── SCREEN: History ──────────────────────────────────────────────────────────
function HistoryScreen({ studentName, onBack }) {
  const history = loadHistory(studentName)
  return (
    <div style={{ minHeight: '100vh', background: C.bg, padding: '32px 20px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <button style={S.ghost} onClick={onBack}>← Back</button>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text }}>My Score History</h2>
            <p style={{ color: C.muted, fontSize: 13 }}>{studentName} · {EXAM_TITLE}</p>
          </div>
        </div>
        {history.length === 0
          ? <div style={{ ...S.card, textAlign: 'center', color: C.muted, padding: 48 }}>No attempts yet.</div>
          : history.map((r, i) => (
            <div key={i} style={{ ...S.card, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 13, color: C.muted }}>{r.date}{r.autoSubmitted ? ' · Auto-submitted' : ''}</div>
                  <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{r.correct}/{r.total} correct</div>
                </div>
                <span style={{ fontSize: 28, fontWeight: 800, color: r.pct >= 75 ? C.green : r.pct >= 60 ? C.yellow : C.red }}>
                  {r.pct}%
                </span>
              </div>
              {r.topics && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {Object.values(r.topics).map(t => {
                    const tp = Math.round((t.correct / t.total) * 100)
                    return (
                      <span key={t.label} style={{
                        fontSize: 12, padding: '3px 10px', borderRadius: 20,
                        background: tp >= 80 ? C.greenBg : tp >= 60 ? '#fffbeb' : C.redBg,
                        border: `1px solid ${tp >= 80 ? C.green : tp >= 60 ? C.yellow : C.red}`,
                        color: tp >= 80 ? C.green : tp >= 60 ? C.yellow : C.red
                      }}>
                        {t.label}: {tp}%
                      </span>
                    )
                  })}
                </div>
              )}
            </div>
          ))
        }
      </div>
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]           = useState('login')
  const [studentName, setStudentName] = useState('')
  const [lastResult, setLastResult]   = useState(null)

  if (screen === 'login')
    return <LoginScreen onLogin={n => { setStudentName(n); setScreen('exam') }} />

  if (screen === 'exam')
    return <ExamScreen studentName={studentName} onFinish={r => { setLastResult(r); setScreen('results') }} />

  if (screen === 'results')
    return <ResultsScreen
      studentName={studentName} result={lastResult}
      onReview={()      => setScreen('review')}
      onViewHistory={()  => setScreen('history')}
      onRetake={()       => setScreen('exam')}
    />

  if (screen === 'review')
    return <ReviewScreen studentName={studentName} result={lastResult} onDone={() => setScreen('results')} />

  if (screen === 'history')
    return <HistoryScreen studentName={studentName} onBack={() => setScreen('results')} />
}
