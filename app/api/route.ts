export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;

  const latency = 2; // In seconds
  await new Promise(r => setTimeout(r, latency * 1000));

  return Response.json({
    selectedOptions: searchParams.getAll('option'),
  });
}
