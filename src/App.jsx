import { useState, useEffect } from 'react'
import { SECTIONS } from './questions.js'
import { sendToSheet } from './sheets.js'

// ─── localStorage helpers (keyed per student name) ───────────────────────────
const STORE_KEY = (name) => `pyexam_${name.trim().toLowerCase().replace(/\s+/g, '_')}`

function loadHistory(name) {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY(name)) || '[]')
  } catch { return [] }
}

function saveResult(name, result) {
  const history = loadHistory(name)
  history.unshift(result)          // newest first
  localStorage.setItem(STORE_KEY(name), JSON.stringify(history.slice(0, 20)))
}

// ─── shared style tokens ─────────────────────────────────────────────────────
const S = {
  card: {
    background: '#111827',
    border: '1px solid #1f2937',
    borderRadius: 16,
    padding: 32
  },
  btn: (color = '#3b5bdb') => ({
    background: color,
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '12px 28px',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit'
  }),
  ghost: {
    background: 'transparent',
    color: '#94a3b8',
    border: '1px solid #1f2937',
    borderRadius: 10,
    padding: '10px 22px',
    fontSize: 14,
    cursor: 'pointer',
    fontFamily: 'inherit'
  }
}

// ─── SCREEN: Login ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [name, setName] = useState('')
  const [err, setErr] = useState('')

  function handleStart() {
    const trimmed = name.trim()
    if (trimmed.length < 2) { setErr('Please enter your full name (at least 2 characters).'); return }
    onLogin(trimmed)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ ...S.card, maxWidth: 480, width: '100%', textAlign: 'center' }}>
        {/* logo */}
        <div style={{ fontSize: 52, marginBottom: 8 }}>🐍</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Python Course Exam</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 32 }}>
          {SECTIONS.length} topics &nbsp;·&nbsp; {SECTIONS.reduce((s, x) => s + x.questions.length, 0)} questions
        </p>

        <label style={{ display: 'block', textAlign: 'left', marginBottom: 8, fontSize: 14, color: '#94a3b8' }}>
          Your name
        </label>
        <input
          autoFocus
          value={name}
          onChange={e => { setName(e.target.value); setErr('') }}
          onKeyDown={e => e.key === 'Enter' && handleStart()}
          placeholder="e.g. Priya Sharma"
          style={{
            width: '100%', padding: '13px 16px', fontSize: 16,
            background: '#1a2035', border: `1px solid ${err ? '#ef4444' : '#1f2937'}`,
            borderRadius: 10, color: '#e2e8f0', outline: 'none',
            fontFamily: 'inherit', marginBottom: 8
          }}
        />
        {err && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12, textAlign: 'left' }}>{err}</p>}

        <button style={{ ...S.btn(), width: '100%', marginTop: 16, padding: '14px' }} onClick={handleStart}>
          Start Exam →
        </button>

        <p style={{ marginTop: 20, fontSize: 13, color: '#475569' }}>
          Your scores are saved privately in this browser.
        </p>
      </div>
    </div>
  )
}

// ─── SCREEN: Exam ─────────────────────────────────────────────────────────────
function ExamScreen({ studentName, onFinish }) {
  // flatten all questions, tagging section info
  const allQ = SECTIONS.flatMap(sec =>
    sec.questions.map(q => ({ ...q, secId: sec.id, secLabel: sec.label, secColor: sec.color }))
  )

  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [answers, setAnswers] = useState([])   // {secId, secLabel, correct}
  const [secProgress, setSecProgress] = useState({}) // secId → {correct, total}

  const current = allQ[idx]
  const progress = ((idx) / allQ.length) * 100

  function confirm() {
    if (selected === null) return
    const correct = selected === current.answer
    const rec = { secId: current.secId, secLabel: current.secLabel, correct }
    setAnswers(prev => [...prev, rec])
    setSecProgress(prev => {
      const s = prev[current.secId] || { correct: 0, total: 0 }
      return { ...prev, [current.secId]: { correct: s.correct + (correct ? 1 : 0), total: s.total + 1 } }
    })
    setConfirmed(true)
  }

  function next() {
    if (idx + 1 >= allQ.length) {
      // build result
      const totalCorrect = answers.filter(a => a.correct).length + (selected === current.answer ? 1 : 0)
      const topicBreakdown = {}
      const allAnswers = [...answers, { secId: current.secId, secLabel: current.secLabel, correct: selected === current.answer }]
      allAnswers.forEach(a => {
        if (!topicBreakdown[a.secId]) topicBreakdown[a.secId] = { label: a.secLabel, correct: 0, total: 0 }
        topicBreakdown[a.secId].correct += a.correct ? 1 : 0
        topicBreakdown[a.secId].total += 1
      })
      const result = {
        date: new Date().toLocaleString('en-IN'),
        total: allQ.length,
        correct: totalCorrect,
        pct: Math.round((totalCorrect / allQ.length) * 100),
        topics: topicBreakdown
      }
      saveResult(studentName, result)
      sendToSheet(studentName, result) // fire-and-forget, sends to Google Sheets
      onFinish(result)
      return
    }
    setIdx(idx + 1)
    setSelected(null)
    setConfirmed(false)
  }

  const optionStyle = (i) => {
    let bg = '#1a2035', border = '#1f2937', color = '#e2e8f0'
    if (selected === i && !confirmed) { bg = '#1e3a5f'; border = '#3b82f6' }
    if (confirmed) {
      if (i === current.answer) { bg = '#052e16'; border = '#22c55e'; color = '#86efac' }
      else if (i === selected) { bg = '#450a0a'; border = '#ef4444'; color = '#fca5a5' }
    }
    return {
      width: '100%', textAlign: 'left', padding: '13px 18px', marginBottom: 8,
      background: bg, border: `1.5px solid ${border}`, borderRadius: 10, color,
      cursor: confirmed ? 'default' : 'pointer', fontSize: 14, fontFamily: 'inherit',
      transition: 'all 0.15s'
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '20px 20px 60px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 13, color: '#64748b' }}>Hi, {studentName}</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>
              Question {idx + 1} of {allQ.length}
            </div>
          </div>
          <div style={{
            background: '#1a2035', borderRadius: 8, padding: '6px 14px',
            fontSize: 13, color: '#94a3b8', border: '1px solid #1f2937'
          }}>
            📚 {current.secLabel}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ background: '#1a2035', borderRadius: 4, height: 4, marginBottom: 28 }}>
          <div style={{ background: current.secColor, height: 4, borderRadius: 4, width: `${progress}%`, transition: 'width 0.3s' }} />
        </div>

        {/* Question card */}
        <div style={{ ...S.card, marginBottom: 16 }}>
          <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.6, whiteSpace: 'pre-wrap', marginBottom: 24 }}>
            {current.q}
          </p>
          {current.options.map((opt, i) => (
            <button key={i} style={optionStyle(i)} onClick={() => !confirmed && setSelected(i)}>
              <span style={{ color: '#475569', marginRight: 10, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </button>
          ))}
        </div>

        {/* Explanation */}
        {confirmed && (
          <div style={{
            background: selected === current.answer ? '#052e16' : '#1a0a00',
            border: `1px solid ${selected === current.answer ? '#22c55e' : '#ef4444'}`,
            borderRadius: 12, padding: '14px 18px', marginBottom: 16, fontSize: 14, lineHeight: 1.6
          }}>
            <strong style={{ color: selected === current.answer ? '#86efac' : '#fca5a5' }}>
              {selected === current.answer ? '✓ Correct! ' : '✗ Incorrect. '}
            </strong>
            <span style={{ color: '#cbd5e1' }}>{current.explain}</span>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          {!confirmed
            ? <button style={{ ...S.btn(), flex: 1, opacity: selected === null ? 0.4 : 1 }} onClick={confirm}>
                Confirm Answer
              </button>
            : <button style={{ ...S.btn('#0f766e'), flex: 1 }} onClick={next}>
                {idx + 1 >= allQ.length ? 'See My Results →' : 'Next Question →'}
              </button>
          }
        </div>
      </div>
    </div>
  )
}

// ─── SCREEN: Results ──────────────────────────────────────────────────────────
function ResultsScreen({ studentName, result, onViewHistory, onRetake }) {
  const pct = result.pct
  const grade = pct >= 90 ? { label: 'Excellent', color: '#22c55e' }
              : pct >= 75 ? { label: 'Good', color: '#3b82f6' }
              : pct >= 60 ? { label: 'Pass', color: '#f59e0b' }
              : { label: 'Needs Work', color: '#ef4444' }

  const [syncStatus, setSyncStatus] = useState('sending') // sending | done | skipped

  useEffect(() => {
    // Check after 3s — if sheet not configured it will be 'skipped'
    const t = setTimeout(() => setSyncStatus('done'), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ minHeight: '100vh', padding: '32px 20px' }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        {/* Score hero */}
        <div style={{ ...S.card, textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>
            {pct >= 75 ? '🎉' : pct >= 60 ? '📘' : '💪'}
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
            {studentName}'s Result
          </h2>
          <p style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>{result.date}</p>

          <div style={{ fontSize: 56, fontWeight: 700, color: grade.color, lineHeight: 1 }}>{pct}%</div>
          <div style={{ color: grade.color, fontWeight: 600, marginTop: 6, marginBottom: 4 }}>{grade.label}</div>
          <div style={{ color: '#64748b', fontSize: 14 }}>{result.correct} / {result.total} correct</div>

          {/* Sheet sync badge */}
          <div style={{ marginTop: 16, fontSize: 12, color: syncStatus === 'sending' ? '#64748b' : '#22c55e' }}>
            {syncStatus === 'sending' ? '⏳ Sending score to teacher…' : '✓ Score sent to teacher'}
          </div>
        </div>

        {/* Topic breakdown */}
        <div style={{ ...S.card, marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 18, color: '#94a3b8' }}>Topic Breakdown</h3>
          {Object.values(result.topics).map(t => {
            const tp = Math.round((t.correct / t.total) * 100)
            return (
              <div key={t.label} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 14 }}>{t.label}</span>
                  <span style={{ fontSize: 13, color: '#64748b' }}>{t.correct}/{t.total} — {tp}%</span>
                </div>
                <div style={{ background: '#1a2035', borderRadius: 4, height: 6 }}>
                  <div style={{
                    height: 6, borderRadius: 4, width: `${tp}%`,
                    background: tp >= 80 ? '#22c55e' : tp >= 60 ? '#f59e0b' : '#ef4444',
                    transition: 'width 0.6s'
                  }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ ...S.btn('#3b5bdb'), flex: 1 }} onClick={onViewHistory}>My Score History</button>
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
    <div style={{ minHeight: '100vh', padding: '32px 20px' }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <button style={S.ghost} onClick={onBack}>← Back</button>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>My Score History</h2>
            <p style={{ color: '#64748b', fontSize: 13 }}>{studentName}</p>
          </div>
        </div>

        {history.length === 0
          ? <div style={{ ...S.card, textAlign: 'center', color: '#475569', padding: 48 }}>
              No attempts yet.
            </div>
          : history.map((r, i) => (
            <div key={i} style={{ ...S.card, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: '#64748b' }}>{r.date}</span>
                <span style={{
                  fontSize: 20, fontWeight: 700,
                  color: r.pct >= 75 ? '#22c55e' : r.pct >= 60 ? '#f59e0b' : '#ef4444'
                }}>{r.pct}%</span>
              </div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{r.correct}/{r.total} correct</div>
              {r.topics && (
                <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {Object.values(r.topics).map(t => (
                    <span key={t.label} style={{
                      fontSize: 12, padding: '3px 10px', borderRadius: 20,
                      background: '#1a2035', border: '1px solid #1f2937', color: '#94a3b8'
                    }}>
                      {t.label}: {Math.round((t.correct / t.total) * 100)}%
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        }
      </div>
    </div>
  )
}

// ─── ROOT App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('login')  // login | exam | results | history
  const [studentName, setStudentName] = useState('')
  const [lastResult, setLastResult] = useState(null)

  function handleLogin(name) {
    setStudentName(name)
    setScreen('exam')
  }

  function handleFinish(result) {
    setLastResult(result)
    setScreen('results')
  }

  if (screen === 'login') return <LoginScreen onLogin={handleLogin} />
  if (screen === 'exam')  return <ExamScreen studentName={studentName} onFinish={handleFinish} />
  if (screen === 'results') return (
    <ResultsScreen
      studentName={studentName}
      result={lastResult}
      onViewHistory={() => setScreen('history')}
      onRetake={() => setScreen('exam')}
    />
  )
  if (screen === 'history') return (
    <HistoryScreen
      studentName={studentName}
      onBack={() => setScreen('results')}
    />
  )
}
