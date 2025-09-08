import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })

export async function addToSheet(data: {
  name: string
  email: string
  message: string
  type: string
  timestamp: string
}) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.timestamp,
          data.name,
          data.email,
          data.type,
          data.message
        ]]
      }
    })
    
    return { success: true }
  } catch (error) {
    console.error('Google Sheets error:', error)
    return { success: false, error }
  }
}