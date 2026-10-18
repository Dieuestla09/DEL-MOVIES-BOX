import { useMemo, useState } from 'react';
import { Box, Chip, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, Typography } from '@mui/material';
import { useFetch } from '../hooks/useFetch.js';
import { fetchDiscover, fetchGenres } from '../services/tmdb.js';
import MovieGrid from '../components/common/MovieGrid.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

function Movies() {
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const { data: genreData } = useFetch(async () => fetchGenres('movie'));
  const genres = genreData || [];

  const query = useMemo(() => ({ withGenres: selectedGenre === 'all' ? null : Number(selectedGenre), sortBy, page }), [page, selectedGenre, sortBy]);
  const { data, loading, error, refetch } = useFetch(async () => fetchDiscover('movie', query), [query]);
  const movies = data?.items || [];

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setPage(1);
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Movies</Typography>
      <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1, mb: 2 }} className="horizontal-scroll">
        <Chip label="All" color={selectedGenre === 'all' ? 'primary' : 'default'} onClick={() => handleGenreChange('all')} />
        {genres.map((genre) => (
          <Chip key={genre.id} label={genre.name} color={selectedGenre === String(genre.id) ? 'primary' : 'default'} onClick={() => handleGenreChange(String(genre.id))} />
        ))}
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel>Sort</InputLabel>
          <Select label="Sort" value={sortBy} onChange={handleSort}>
            <MenuItem value="popularity.desc">Popularity</MenuItem>
            <MenuItem value="vote_average.desc">Top Rated</MenuItem>
            <MenuItem value="primary_release_date.desc">Newest</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {loading ? (
        <MovieGrid items={Array.from({ length: 12 }, (_, index) => ({ id: index, mediaType: 'movie', title: 'Loading', year: '', rating: 0, posterUrl: null }))} />
      ) : error ? (
        <ErrorState message={error.message || 'Failed to load movies.'} onRetry={refetch} />
      ) : movies.length === 0 ? (
        <EmptyState title="No movies found" message="Try another genre or sort option." />
      ) : (
        <>
          <MovieGrid items={movies} />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination count={data?.totalPages || 1} page={Math.min(page, data?.totalPages || 1)} onChange={(_, value) => setPage(value)} color="primary" />
          </Box>
        </>
      )}
    </Box>
  );
}

export default Movies;
