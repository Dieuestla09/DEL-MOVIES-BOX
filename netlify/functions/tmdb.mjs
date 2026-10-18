import { createTmdbResponse } from '../../api/tmdb.js';

export async function handler(event) {
  const result = await createTmdbResponse(event.httpMethod, event.rawUrl, process.env.TMDB_API_KEY);

  return {
    statusCode: result.status,
    headers: result.headers,
    body: JSON.stringify(result.body),
  };
}