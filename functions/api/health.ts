// GET /api/health — Simple health check to verify functions are working

export const onRequestGet: PagesFunction = async () => {
  return new Response(
    JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'Martin Solutions API is running',
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
