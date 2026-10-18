const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const ALLOWED_PATH = /^\/(?:trending|movie|tv|search|discover|genre)(?:\/[a-zA-Z0-9_-]+)*$/;

export async function createTmdbResponse(method, url, apiKey = process.env.TMDB_API_KEY) {
  if (method !== 'GET') {
    return { status: 405, headers: {}, body: { error: 'Method not allowed.' } };
  }

  const requestUrl = new URL(url, 'http://localhost');
  const path = requestUrl.searchParams.get('path');

  if (!path || !ALLOWED_PATH.test(path)) {
    return { status: 400, headers: {}, body: { error: 'Invalid TMDB endpoint.' } };
  }

  if (!apiKey) {
    return { status: 503, headers: {}, body: { error: 'TMDB service is not configured.' } };
  }

  const params = new URLSearchParams(requestUrl.searchParams);
  params.delete('path');
  params.set('api_key', apiKey);

  try {
    const tmdbResponse = await fetch(`${TMDB_BASE_URL}${path}?${params.toString()}`);
    const data = await tmdbResponse.json();
    return {
      status: tmdbResponse.status,
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=600' },
      body: data,
    };
  } catch {
    return { status: 502, headers: {}, body: { error: 'Unable to reach TMDB right now.' } };
  }
}

export default async function handler(request, response, apiKey = process.env.TMDB_API_KEY) {
  const result = await createTmdbResponse(request.method, request.url, apiKey);
  Object.entries(result.headers).forEach(([name, value]) => response.setHeader(name, value));
  return response.status(result.status).json(result.body);
}