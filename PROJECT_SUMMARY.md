# Python Assessment App — Project Summary

## What This Project Is

A web-based Python course exam app built for a teacher (Bidurin) to assess students on Python topics. Students log in with just their name, take an MCQ exam, see their results, and the teacher automatically receives all scores in a Google Sheet.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Hosting | Vercel (free tier) |
| Source control | GitHub |
| Score storage (student) | Browser localStorage |
| Score storage (teacher) | Google Sheets via Apps Script |
| Styling | Inline CSS (no external UI library) |
| Font | DM Sans + JetBrains Mono (Google Fonts) |

---

## GitHub Repository

```
https://github.com/Bidurin/python_assessment
```

Deployed live at:
```
https://python-assessment.vercel.app
```

---

## Project Structure

```
python-exam/
├── index.html              ← entry point, loads Google Fonts
├── vite.config.js          ← Vite + React plugin config
├── package.json            ← dependencies (react, react-dom, vite)
├── .gitignore              ← excludes node_modules, dist
└── src/
    ├── main.jsx            ← React root mount
    ├── App.jsx             ← all screens and logic
    ├── questions.js        ← all exam questions and sections
    ├── config.js           ← SHEET_URL (Google Apps Script endpoint)
    └── sheets.js           ← sends result to Google Sheets on finish
```

---

## App Screens & Flow

```
Login Screen
    ↓  (student enters name, no password)
Exam Screen
    ↓  (one question at a time, confirm → explanation → next)
Results Screen
    ↓  (score %, grade, topic breakdown bars)
    ↓  (score auto-sent to Google Sheets in background)
My History Screen
    (student sees their own past attempts only)
```

---

## Key Design Decisions

- **No password login** — students enter only their name
- **Privacy** — each student's history stored under a unique localStorage key: `pyexam_<name>`. One student cannot see another's scores.
- **No database** — student-side uses localStorage. Teacher-side uses Google Sheets via Apps Script (no backend server needed).
- **No-cors POST** — Google Apps Script receives scores via a fire-and-forget `fetch` with `mode: 'no-cors'`. The student sees "✓ Score sent to teacher" after 3 seconds.
- **Vercel static hosting** — no server, no cost. Redeploys automatically on every `git push`.

---

## Questions Structure (`src/questions.js`)

```js
export const SECTIONS = [
  {
    id: 'variables',        // unique id, used as column prefix in sheet
    label: 'Variables & Data Types',
    color: '#3b82f6',       // accent color for progress bar
    questions: [
      {
        q: 'Question text',
        options: ['A', 'B', 'C', 'D'],
        answer: 2,          // index of correct option (0-based)
        explain: 'Explanation shown after answering'
      }
    ]
  },
  // ... more sections
]
```

**Current topics (Phase 2 — 4 topics, 9 questions total):**
- Variables & Data Types (3 questions)
- Strings (2 questions)
- Loops (2 questions)
- Lists (2 questions)

**Planned topics (Phase 3 — full 12 topics):**
- Variables & Data Types ⭐
- Strings ⭐
- Numbers & Operators
- Boolean & Comparison
- If-Else Statements ⭐
- Loops ⭐
- Lists ⭐
- Tuples
- Dictionaries ⭐
- Sets
- File Handling
- Functions ⭐

*(⭐ = starred topics get more questions — 5 each. Others get 3.)*

---

## Google Sheets Integration

### How it works
1. Student finishes exam
2. `sheets.js` fires a POST request to a Google Apps Script Web App URL
3. The script appends a row to the teacher's Google Sheet
4. Teacher sees results live — no refresh needed

### Config file (`src/config.js`)
```js
export const SHEET_URL = 'https://script.google.com/macros/s/YOUR_ID/exec'
```

### Sheet columns
```
name | date | score_pct | correct | total |
topic_variables_pct | topic_variables_correct | topic_variables_total |
topic_strings_pct   | topic_strings_correct   | topic_strings_total   |
... (one set of 3 columns per topic)
```

### Apps Script code (saved in Google Sheets → Extensions → Apps Script)
```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(Object.keys(data));
    }
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    Object.keys(data).forEach(function(key) {
      if (headers.indexOf(key) === -1) {
        sheet.getRange(1, headers.length + 1).setValue(key);
        headers.push(key);
      }
    });
    var row = headers.map(function(h) { return data[h] !== undefined ? data[h] : ''; });
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## How to Run Locally

```bash
npm install
npm run dev
# opens at http://localhost:5173
```

## How to Deploy Changes

```bash
git add .
git commit -m "your message"
git push
# Vercel auto-redeploys in ~1 minute
```

---

## Phases

| Phase | Status | What was built |
|---|---|---|
| Phase 1 | ✅ Done | Login, exam, results, my history, localStorage |
| Phase 2 | ✅ Done | Google Sheets score reporting |
| Phase 3 | 🔜 Next | Full question bank — all 12 topics |

---

## Known Issues / Gotchas

- `node_modules` must NOT be committed to GitHub — Vercel installs its own. Ensure `.gitignore` contains `node_modules/`.
- Google Apps Script uses `no-cors` so the app cannot confirm delivery — it assumes success after 3 seconds.
- localStorage is browser-specific — if a student uses a different browser or device, their history won't carry over.
- Student names are case-insensitive and space-normalized for localStorage keys (e.g. "Priya Sharma" → `pyexam_priya_sharma`).

---

## Future Ideas (not built yet)

- Phase 3: Full 12-topic question bank with starred topics having 5 questions each
- Timed exam mode
- Teacher dashboard (password-protected view of all scores inside the app)
- Randomised question order per attempt
- PDF result download for students
