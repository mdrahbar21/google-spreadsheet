import redis from './redisClient';
import oAuth2Client from './googleClient';

export const saveTokens = async (tokens: any) => {
  await redis.set('google_auth_tokens', JSON.stringify(tokens));
};

export const getSavedTokens = async () => {
  const tokensString = await redis.get('google_auth_tokens');
  return tokensString ? JSON.parse(tokensString as string) : null;
};

export const refreshGoogleTokens = async () => {
    const tokens = await getSavedTokens();
    if (tokens && tokens.refresh_token) {
        oAuth2Client.setCredentials(tokens);
        const newTokens = await oAuth2Client.getAccessToken();
        if (newTokens.res) {
            await saveTokens({...tokens, ...newTokens.res.data});
            return newTokens.res.data;
        }
    }
    return null;
};
export const getTokensFromCode = async (code: string) => {
    const { tokens } = await oAuth2Client.getToken(code);
    return tokens;
};


export const ensureAuthCredentials = async () => {
  const tokens = await getSavedTokens();
  if (tokens) {
    oAuth2Client.setCredentials(tokens);
  } else {
    throw new Error("No tokens found. User needs to authenticate.");
  }
};
