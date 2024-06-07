// import oAuth2Client from '@/utilities/googleClient';
// import { Redis } from '@upstash/redis'

// const redis = new Redis({
//     url: 'https://cheerful-dolphin-53244.upstash.io',
//     token: 'Ac_8AAIncDE2MWI5MTkyNjQ4MWI0ZDExYTU1ZTRkNTAzZjFhNzc0OHAxNTMyNDQ',
//   })

// export async function POST(req: Request) {
//     const { code } = await req.json();

//     if (code) {
//         try {
//             const { tokens } = await oAuth2Client.getToken(code as string);
//             oAuth2Client.setCredentials(tokens);
//             await redis.set('tokens', JSON.stringify(tokens));
      
//             Response.redirect('/dashboard');  // Redirect to a part of your app that uses the API
//         } catch (error) {
//             return Response.json({ error: 'Error retrieving access token', details: error });
//         }
//     } else {
//         return Response.json({ error: 'Missing code in request' });
//     }
// }
// In your API or before calling appendDataToSheet or readSheet
import { getTokensFromCode, saveTokens } from '@/utilities/authHelper';

export async function POST(req: Request) {
  const { code } = await req.json() as { code: string };

  if (!code) {
    return Response.json({ error: 'Code is required' });
  }

  try {
    const tokens = await getTokensFromCode(code);
    await saveTokens(tokens);
    Response.redirect('/dashboard');
  } catch (error) {
    console.error('Failed to exchange code for tokens:', error);
    Response.json({ error: 'Failed to authenticate', details: error });
  }
}
