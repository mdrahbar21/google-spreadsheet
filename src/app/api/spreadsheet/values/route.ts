import { google, sheets_v4 } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

async function getValues(auth: any, spreadsheetId: string, range: string): Promise<any[]> {
    const sheets = google.sheets({ version: 'v4', auth });
    try {
        const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
        return result.data.values || [];
    } catch (err) {
        console.error('Failed to get spreadsheet values:', err);
        throw new Error('Failed to get spreadsheet values');
    }
}

async function updateValues(auth: any, spreadsheetId: string, range: string, values: any[][]): Promise<void> {
    const sheets = google.sheets({ version: 'v4', auth });
    const request: sheets_v4.Params$Resource$Spreadsheets$Values$Update = {
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values,
        },
    };

    try {
        await sheets.spreadsheets.values.update(request);
    } catch (err) {
        console.error('Failed to update spreadsheet values:', err);
        throw new Error('Failed to update spreadsheet values');
    }
}

export async function POST(req: NextRequest) {
    const { spreadsheetId, range, method, values } = await req.json();
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    try {
        if (method === 'read') {
            const readValues = await getValues(auth, spreadsheetId, range);
            return NextResponse.json({ values: readValues }, { status: 200 });
        } else if (method === 'write') {
            await updateValues(auth, spreadsheetId, range, values);
            return NextResponse.json({ message: 'Values updated successfully' }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}
