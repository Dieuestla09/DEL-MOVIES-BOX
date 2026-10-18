import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailsView from '../components/details/DetailsView.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { getMediaDetails } from '../services/tmdb.js';
import { DEL_MOVIE_BOX } from '../constants.js';

function Details() {
  const { id } = useParams();
  const pathname = window.location.pathname;
  const mediaType = pathname.startsWith('/movie/') ? 'movie' : 'tv';

  const { data, loading, error, refetch } = useFetch(async (signal) => getMediaDetails(mediaType, id, signal), [id, mediaType]);

  useEffect(() => {
    document.title = data?.title ? `${data.title} | ${DEL_MOVIE_BOX}` : `Details | ${DEL_MOVIE_BOX}`;
  }, [data]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
  }

  if (error) {
    return (
      <Alert severity="error" action={<button type="button" onClick={() => refetch()}>Try again</button>}>
        We couldn’t load this title.
      </Alert>
    );
  }

  if (!data) return <Typography variant="h5">Not found.</Typography>;

  return <DetailsView item={data} />;
}

export default Details;
