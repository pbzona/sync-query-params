export function getApiUrl() {
  if (process.env.VERCEL_ENV === 'development') {
    return 'http://localhost:3000';
  }

  return `https://${process.env.VERCEL_URL}`;
}
