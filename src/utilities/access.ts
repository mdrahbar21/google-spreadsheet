import { google } from 'googleapis';
import oAuth2Client from './googleClient';

const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

export async function readSheet(sheetId: string, range: string) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: range,
    });
    return response.data.values;
  } catch (error) {
    console.error('The API returned an error: ' + error);
    throw error;
  }
}
