import { Box, Button, Chip, Grid, Rating, Stack, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import { useWatchlist } from '../../context/useWatchlist.js';
import Poster from '../common/Poster.jsx';
import CastList from './CastList.jsx';

function DetailsView({ item }) {
  const { isInWatchlist, toggleItem } = useWatchlist();
  const isSaved = item ? isInWatchlist(item.mediaType, item.id) : false;

  if (!item) return null;

  const handleToggle = () => {
    toggleItem({
      id: item.id,
      mediaType: item.mediaType,
      title: item.title,
      posterUrl: item.posterUrl,
      rating: item.rating,
      year: item.year,
      genreIds: item.genreIds || [],
    });
  };

  const runtimeText = item.runtime ? `${item.runtime} min` : item.seasons ? `${item.seasons} seasons • ${item.episodes} episodes` : 'Runtime unavailable';

  return (
    <Box>
      <Box sx={{ position: 'relative', minHeight: 340, borderRadius: 4, overflow: 'hidden', background: item.backdropUrl ? `linear-gradient(90deg, rgba(11,13,18,0.8), rgba(11,13,18,0.3)), url(${item.backdropUrl})` : 'linear-gradient(135deg, #333, #111)', backgroundSize: 'cover', backgroundPosition: 'center', mb: 4 }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(11,13,18,0.6) 100%)' }} />
        <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 2, md: 4 }, pt: { xs: 10, md: 16 } }}>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={12} md={3}>
              <Box sx={{ width: { xs: 180, md: 220 }, ml: { md: 2 }, boxShadow: '0 18px 40px rgba(0,0,0,0.4)' }}>
                <Poster title={item.title} posterUrl={item.posterUrl} size={220} />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  <Typography variant="h3">{item.title}</Typography>
                  <Chip label={item.mediaType === 'tv' ? 'TV' : 'Movie'} color="primary" />
                </Stack>
                {item.tagline ? <Typography variant="subtitle1" color="text.secondary">{item.tagline}</Typography> : null}
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                  <Stack direction="row" spacing={0.6} alignItems="center">
                    <CalendarTodayOutlinedIcon fontSize="small" color="primary" />
                    <Typography variant="body2" color="text.secondary">{item.releaseDate || 'Date unavailable'}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.6} alignItems="center">
                    <AccessTimeIcon fontSize="small" color="primary" />
                    <Typography variant="body2" color="text.secondary">{runtimeText}</Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  <Rating value={Math.min(item.rating / 2, 5)} precision={0.5} readOnly />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.rating.toFixed(1)}/10</Typography>
                  <Typography variant="body2" color="text.secondary">({item.voteCount} votes)</Typography>
                </Stack>
                {item.genres?.length ? (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {item.genres.map((genre) => (
                      <Chip key={genre.id} label={genre.name} variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.12)', color: '#F2F4F8' }} />
                    ))}
                  </Stack>
                ) : null}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <Button variant="contained" color="primary" onClick={handleToggle}>{isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}</Button>
                  {item.trailer ? (
                    <Button component="a" href={`https://www.youtube.com/watch?v=${item.trailer.key}`} target="_blank" rel="noopener noreferrer" variant="outlined" startIcon={<PlayCircleOutlineOutlinedIcon />}>
                      Watch Trailer
                    </Button>
                  ) : null}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" sx={{ mb: 1 }}>Overview</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>{item.overview || 'No description available.'}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <CastList cast={item.cast || []} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DetailsView;
