/**
 * Google Apps Script — Microsite Data Collector
 *
 * DEPLOY STEPS:
 * 1. Go to https://script.google.com and create a new project
 * 2. Paste this entire file into the editor
 * 3. Click Deploy → New deployment
 * 4. Type: Web app
 * 5. Execute as: Me
 * 6. Who has access: Anyone
 * 7. Click Deploy → copy the Web app URL
 * 8. Add the URL to Vercel env vars as: GOOGLE_SHEETS_WEBHOOK_URL
 */

const SPREADSHEET_ID = "1vS4HT833jlI5u_xWKWL0OoG2pL9LI8Ie-2JZNUm5LjQ";
const SHEET_GID = 991071894;

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheets = spreadsheet.getSheets();
    const sheet = sheets.find(s => s.getSheetId() === SHEET_GID) || sheets[0];

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.company || "",
      data.phone || "",
      data.leadId || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test this function manually in the Apps Script editor to verify sheet access
function testAppend() {
  doPost({
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: "Test User",
        email: "test@example.com",
        company: "Test Co",
        phone: "",
        leadId: "test-lead-001"
      })
    }
  });
}
