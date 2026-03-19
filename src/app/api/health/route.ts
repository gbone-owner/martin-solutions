export const runtime = 'edge';

export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Martin Solutions API is running',
  });
}
