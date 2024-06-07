import { appendDataToSheet } from '@/utilities/sheetOperations';

export async function POST(req: Request) {
    const sheetId = "1EB3B1epNgEMQ_jeeaHCbTkaN9MDk24sy3XD_VOkNLFg";
    
    if (req.method === 'POST') {
        try {
            const reqBody = await req.json();  // Parse JSON body from the request
            const {
                data: { driverName, truckNumber, phoneNumber, consumerNumber, supplierNumber, loadedTime, departureTime, destination, arrivalTime }
            } = reqBody;
    
            const values = [
                [new Date().toISOString().split('T')[0], driverName, truckNumber, phoneNumber, consumerNumber, supplierNumber, loadedTime, departureTime, destination, arrivalTime]
            ];
    
            const result = await appendDataToSheet(sheetId, 'A:J', values);
            return new Response(JSON.stringify({ message: 'Record updated successfully', result }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error: any) {
            return new Response(JSON.stringify({ message: 'Failed to update record', error: error.message }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    } else {
        return new Response(`Method ${req.method} Not Allowed`, {
            status: 405,
            headers: {
                'Allow': 'POST',
                'Content-Type': 'text/plain'
            }
        });
    }
}
