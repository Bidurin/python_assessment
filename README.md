# Python Exam — Teacher Setup Guide

## Google Sheets Setup (5 minutes, one time only)

### Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a **new blank spreadsheet**
2. Name it something like **Python Exam Results**
3. In **Row 1**, add these headers (exactly as written):

```
name | date | score_pct | correct | total
```
You can add more columns later — the script will fill them in automatically.

---

### Step 2 — Create the Apps Script

1. In your spreadsheet, click **Extensions → Apps Script**
2. Delete everything in the editor and paste this code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Build header row from first submission if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(Object.keys(data));
    }

    // Check if headers match, add missing columns
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    Object.keys(data).forEach(function(key) {
      if (headers.indexOf(key) === -1) {
        sheet.getRange(1, headers.length + 1).setValue(key);
        headers.push(key);
      }
    });

    // Append data row in correct column order
    var row = headers.map(function(h) { return data[h] !== undefined ? data[h] : ''; });
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (Ctrl+S), name the project **ExamReceiver**

---

### Step 3 — Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon ⚙ next to "Type" and choose **Web app**
3. Fill in:
   - Description: `Exam score receiver`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Click **Authorize access** → choose your Google account → click **Allow**
6. Copy the **Web app URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

### Step 4 — Paste URL into the app

1. Open `src/config.js` in the project
2. Replace `PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE` with your copied URL:

```js
export const SHEET_URL = 'https://script.google.com/macros/s/AKfycb.../exec'
```

3. Save the file, then push to GitHub:
```bash
git add .
git commit -m "add google sheets url"
git push
```

Vercel will redeploy automatically in ~1 minute.

---

### What you'll see in the sheet

Every time a student finishes the exam, a new row appears:

| name | date | score_pct | correct | total | topic_variables_pct | topic_loops_pct | … |
|------|------|-----------|---------|-------|---------------------|-----------------|---|
| Priya Sharma | 02/05/2026 | 85 | 8 | 9 | 100 | 75 | … |
| Rohan Verma | 02/05/2026 | 67 | 6 | 9 | 67 | 50 | … |

---

## Running Locally

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```
