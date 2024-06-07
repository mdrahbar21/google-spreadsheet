import { google } from 'googleapis';
import { ensureAuthCredentials } from './authHelper';
import oAuth2Client from './googleClient';

const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

export const appendDataToSheet = async (sheetId: string, range: string, values: (string | number)[][]) => {
    await ensureAuthCredentials();
    const request = {
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: { values },
    };
    try {
        const response = await sheets.spreadsheets.values.append(request);
        return response.data;
    } catch (error) {
        console.error('Failed to append data to sheet:', error);
        throw error;
    }
};
