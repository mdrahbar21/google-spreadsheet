import { google } from 'googleapis';

const CLIENT_ID = process.env.GOOGLE_SHEET_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_SHEET_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_SHEET_REDIRECT_URI;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export const getAuthUrl = () => {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
};
export const setAuthCredentials = (tokens) => {
  oAuth2Client.setCredentials(tokens);
};

export default oAuth2Client;
