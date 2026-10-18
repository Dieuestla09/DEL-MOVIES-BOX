import { useState } from 'react';
import { Alert, Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState.jsx';
import MovieGrid from '../components/common/MovieGrid.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { searchMulti } from '../services/tmdb.js';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [retryKey, setRetryKey] = useState(0);

  const { data, loading, error } = useFetch(async (signal) => searchMulti(query, { page: 1 }, signal), [query, retryKey], { lazy: !query });

  if (!query) {
    return (
      <Box sx={{ py: 4 }}>
        <EmptyState title="Search for a title" message="Type a movie or show name to discover something new." actionLabel="Browse home" onAction={() => (window.location.href = '/')} />
      </Box>
    );
  }

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 2 }}>Results for “{query}”</Typography>
        <MovieGrid items={Array.from({ length: 12 }, (_, index) => ({ id: index, mediaType: 'movie', title: 'Loading', year: '', rating: 0, posterUrl: null }))} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error" action={<Button onClick={() => setRetryKey((value) => value + 1)}>Try again</Button>}>
          We couldn’t load your search results right now.
        </Alert>
      </Box>
    );
  }

  const results = data?.items || [];
  const people = data?.people || [];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">Results for “{query}”</Typography>
        <Typography variant="body2" color="text.secondary">{results.length + people.length} matches</Typography>
      </Stack>
      {results.length === 0 && people.length === 0 ? (
        <EmptyState title={`No matches for “${query}”`} message="Try another title or browse the popular sections." />
      ) : null}
      {people.length > 0 ? (
        <Box sx={{ mb: results.length ? 4 : 0 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>People</Typography>
          <List disablePadding>
            {people.map((person) => (
              <ListItem key={person.id} disableGutters>
                <ListItemAvatar>
                  <Avatar src={person.profileUrl || undefined} alt={person.name}>
                    {person.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={person.name}
                  secondary={person.knownFor.length ? `Known for ${person.knownFor.join(', ')}` : 'Person'}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : null}
      {results.length > 0 ? (
        <MovieGrid items={results} />
      ) : null}
    </Box>
  );
}

export default SearchResults;
