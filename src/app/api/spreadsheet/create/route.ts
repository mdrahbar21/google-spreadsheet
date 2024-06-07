import { google, sheets_v4 } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

async function createGoogleSheet(title: string): Promise<string> {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const request: sheets_v4.Params$Resource$Spreadsheets$Create = {
        requestBody: {
            properties: { title },
        },
    };

    try {
        const response = await sheets.spreadsheets.create(request);
        console.log(`Spreadsheet ID: ${response.data.spreadsheetId}`);
        return response.data.spreadsheetId!;
    } catch (err) {
        console.error('Failed to create spreadsheet:', err);
        throw new Error('Failed to create spreadsheet');
    }
}

export async function POST(req: NextRequest) {
    const { title } = await req.json();
    try {
        const spreadsheetId = await createGoogleSheet(title);
        return NextResponse.json({ spreadsheetId }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}
