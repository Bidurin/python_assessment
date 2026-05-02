import { SHEET_URL } from './config.js'

/**
 * Sends a student result to Google Sheets via Apps Script Web App.
 * Returns { ok: true } or { ok: false, error: string }
 */
export async function sendToSheet(studentName, result) {
  if (!SHEET_URL || SHEET_URL === 'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE') {
    console.warn('Google Sheets URL not configured — skipping upload.')
    return { ok: false, error: 'not_configured' }
  }

  // Build flat row object
  const row = {
    name: studentName,
    date: result.date,
    score_pct: result.pct,
    correct: result.correct,
    total: result.total,
  }

  // Add per-topic columns
  Object.entries(result.topics).forEach(([id, t]) => {
    row[`topic_${id}_pct`] = Math.round((t.correct / t.total) * 100)
    row[`topic_${id}_correct`] = t.correct
    row[`topic_${id}_total`] = t.total
  })

  try {
    // Google Apps Script requires no-cors for simple POST from browser
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
    })
    // no-cors means we can't read the response, but if no exception it worked
    return { ok: true }
  } catch (err) {
    console.error('Failed to send to Google Sheets:', err)
    return { ok: false, error: err.message }
  }
}
