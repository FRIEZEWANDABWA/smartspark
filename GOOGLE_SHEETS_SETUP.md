# Google Sheets Integration Setup

## Step 1: Create Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Go to "Credentials" → "Create Credentials" → "Service Account"
5. Download the JSON key file

## Step 2: Create Google Sheet

1. Create a new Google Sheet
2. Add headers in row 1: `Timestamp | Name | Email | Type | Message`
3. Copy the Sheet ID from URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

## Step 3: Share Sheet with Service Account

1. Open your Google Sheet
2. Click "Share" 
3. Add the service account email (from JSON file)
4. Give "Editor" permissions

## Step 4: Update Environment Variables

Add to `.env.local`:
```
GOOGLE_CLIENT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----"
GOOGLE_SHEET_ID="your-sheet-id-from-url"
```

## What Gets Tracked:

✅ **Contact Form Submissions**
✅ **Quote Requests** (with service & budget)
✅ **Service Inquiries** 
✅ **Newsletter Signups**
✅ **All user interactions**

## Alternative: Simple Webhook Integration

If you prefer a simpler setup, I can also integrate with:
- **Zapier** (connects to 5000+ apps)
- **IFTTT** (simple automation)
- **Microsoft Power Automate** (Excel Online)
- **Airtable** (database + spreadsheet hybrid)

## Excel Online Integration

For Microsoft Excel Online:
1. Create Excel file in OneDrive
2. Use Microsoft Graph API
3. Real-time sync to Excel Online

Would you like me to set up any of these alternatives?