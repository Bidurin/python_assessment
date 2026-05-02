// ─────────────────────────────────────────────────────────────────────────────
// These values are set per Vercel project as Environment Variables.
// Locally you can create a .env file in the project root:
//   VITE_TOPIC=python
//   VITE_EXAM_TITLE=Python Complete Course Exam
//   VITE_SHEET_URL=https://script.google.com/macros/s/.../exec
// ─────────────────────────────────────────────────────────────────────────────

export const TOPIC      = import.meta.env.VITE_TOPIC      || 'python'
export const EXAM_TITLE = import.meta.env.VITE_EXAM_TITLE || 'Python Complete Course Exam'
export const SHEET_URL  = import.meta.env.VITE_SHEET_URL  || 'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE'
