const IMAGE_BASE = 'https://image.tmdb.org/t/p/';

export const imageUrl = (size, path) => {
  if (!path) return null;
  return `${IMAGE_BASE}${size}${path}`;
};

const buildApiUrl = (path, params = {}) => {
  const proxyParams = new URLSearchParams({ path, ...params });
  return `/api/tmdb?${proxyParams.toString()}`;
};

export async function tmdbRequest(path, params = {}, signal) {
  try {
    const response = await fetch(buildApiUrl(path, params), {
      signal,
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('TMDB did not accept the server API key (401). Check TMDB_API_KEY in your server environment.');
      }
      const text = await response.text();
      throw new Error(`TMDB request failed (${response.status}): ${text || 'Unknown error'}`);
    }

    return response.json();
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw error;
    }

    const message = error instanceof Error && error.message ? error.message : 'Unable to load movie data right now.';
    throw new Error(message.includes('TMDB') ? message : `Unable to load movie data right now. ${message}`);
  }
}

export const normalizeItem = (item = {}, fallbackType = null) => {
  if (!item || typeof item !== 'object') return null;

  const mediaType = item.media_type || fallbackType || (item.first_air_date ? 'tv' : 'movie');
  const title = item.title || item.name || 'Untitled';
  const releaseDate = item.release_date || item.first_air_date || '';
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'Unknown';
  const rating = Number(item.vote_average ?? 0) || 0;
  const posterUrl = item.poster_path ? imageUrl('w342', item.poster_path) : null;
  const backdropUrl = item.backdrop_path ? imageUrl('w780', item.backdrop_path) : null;

  return {
    id: item.id,
    mediaType,
    title,
    posterUrl,
    backdropUrl,
    overview: item.overview || 'No description available.',
    releaseDate,
    year,
    rating,
    genreIds: item.genre_ids || [],
    genres: item.genres || [],
  };
};

export async function fetchTrending() {
  const data = await tmdbRequest('/trending/all/week');
  return (data.results || []).map((item) => normalizeItem(item));
}

export async function fetchPopularMovies() {
  const data = await tmdbRequest('/movie/popular');
  return (data.results || []).map((item) => normalizeItem(item, 'movie'));
}

export async function fetchActionMovies() {
  const data = await tmdbRequest('/discover/movie', { with_genres: 28 });
  return (data.results || []).map((item) => normalizeItem(item, 'movie'));
}

export async function fetchPopularTV() {
  const data = await tmdbRequest('/tv/popular');
  return (data.results || []).map((item) => normalizeItem(item, 'tv'));
}

export async function fetchTopRatedMovies() {
  const data = await tmdbRequest('/movie/top_rated');
  return (data.results || []).map((item) => normalizeItem(item, 'movie'));
}

export async function fetchTopRatedTV() {
  const data = await tmdbRequest('/tv/top_rated');
  return (data.results || []).map((item) => normalizeItem(item, 'tv'));
}

export async function fetchGenres(type = 'movie') {
  const data = await tmdbRequest(`/genre/${type}/list`);
  return data.genres || [];
}

export async function fetchDiscover(type, { page = 1, withGenres, sortBy = 'popularity.desc' } = {}) {
  const query = { page, sort_by: sortBy };
  if (withGenres) query.with_genres = withGenres;

  const data = await tmdbRequest(`/discover/${type}`, query);
  return {
    page: data.page || 1,
    totalPages: Math.min(data.total_pages || 1, 500),
    items: (data.results || []).map((item) => normalizeItem(item, type)),
  };
}

export async function searchMulti(query, { page = 1 } = {}, signal) {
  if (!query || !query.trim()) {
    return { page: 1, totalPages: 1, items: [] };
  }

  const data = await tmdbRequest('/search/multi', { query: query.trim(), page }, signal);
  const results = data.results || [];
  const items = results
    .filter((item) => item.media_type !== 'person' && (item.title || item.name))
    .map((item) => normalizeItem(item, item.media_type || 'movie'));
  const people = results
    .filter((item) => item.media_type === 'person' && item.name)
    .map((person) => ({
      id: person.id,
      name: person.name,
      profileUrl: person.profile_path ? imageUrl('w185', person.profile_path) : null,
      knownFor: (person.known_for || []).map((work) => work.title || work.name).filter(Boolean),
    }));

  return {
    page: data.page || 1,
    totalPages: Math.min(data.total_pages || 1, 500),
    items,
    people,
  };
}

export async function getMediaDetails(type, id, signal) {
  const data = await tmdbRequest(`/${type}/${id}`, { append_to_response: 'videos,credits' }, signal);

  return {
    id: data.id,
    mediaType: type,
    title: data.title || data.name || 'Untitled',
    overview: data.overview || 'No description available.',
    tagline: data.tagline || '',
    posterUrl: data.poster_path ? imageUrl('w500', data.poster_path) : null,
    backdropUrl: data.backdrop_path ? imageUrl('w1280', data.backdrop_path) : null,
    releaseDate: data.release_date || data.first_air_date || 'Unknown',
    year: (data.release_date || data.first_air_date || '').slice(0, 4) || 'Unknown',
    rating: Number(data.vote_average ?? 0) || 0,
    voteCount: data.vote_count || 0,
    runtime: data.runtime || data.episode_run_time?.[0] || null,
    seasons: data.number_of_seasons || null,
    episodes: data.number_of_episodes || null,
    genres: data.genres || [],
    cast: (data.credits?.cast || []).slice(0, 8).map((person) => ({
      id: person.id,
      name: person.name,
      character: person.character || 'Cast',
      profileUrl: person.profile_path ? imageUrl('w185', person.profile_path) : null,
    })),
    trailer: (data.videos?.results || []).find((video) => video.type === 'Trailer' || video.official) || null,
    genreIds: (data.genres || []).map((genre) => genre.id),
  };
}
