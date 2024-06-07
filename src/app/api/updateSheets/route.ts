// import { updateSheet } from '@/utilities/sheetOperations';

// export async function POST(req: Request) {
//     const args= await req.json()
//     const sheetId=args.sheetId;
//     const range=args.range;
//     const values=args.values;

//   try {
//     const result = await updateSheet(sheetId, range, values);
//     return Response.json({ success:true, message: 'Sheet updated successfully', result });
//   } catch (error) {
//     return Response.json({ success: false, message: 'Failed to update sheet', error });
//   }
// }
