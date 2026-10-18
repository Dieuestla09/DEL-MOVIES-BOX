import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Link } from 'react-router-dom';

function HeroBanner({ item, onToggleWatchlist, isSaved }) {
  if (!item) return null;

  const route = item.mediaType === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`;

  return (
    <Box sx={{ position: 'relative', minHeight: 420, borderRadius: 4, overflow: 'hidden', backgroundImage: item.backdropUrl ? `linear-gradient(90deg, rgba(11,13,18,0.88), rgba(11,13,18,0.35)), url(${item.backdropUrl})` : 'linear-gradient(135deg, rgba(255,178,36,0.6), rgba(255,92,92,0.55))', backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid rgba(255,255,255,0.08)', mb: 4 }}>
      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #0b0d12 10%, rgba(11,13,18,0.25) 40%, rgba(11,13,18,0.15) 100%)' }} />
      <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 2.5, md: 4 }, maxWidth: 760, pt: { xs: 8, md: 11 } }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Chip label={item.mediaType === 'tv' ? 'TV Pick' : 'Featured'} color="primary" />
          <Chip label={item.year || 'New'} variant="outlined" sx={{ color: '#F2F4F8', borderColor: 'rgba(255,255,255,0.2)' }} />
        </Stack>
        <Typography variant="h2" sx={{ fontSize: { xs: '2.3rem', md: '4rem' }, lineHeight: 1.05, maxWidth: 620, mb: 1.5 }}>{item.title}</Typography>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: '#FFB224' }}>
            <StarRoundedIcon fontSize="small" />
            <Typography variant="body2" sx={{ color: '#F2F4F8', fontWeight: 600 }}>{(item.rating || 0).toFixed(1)}</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">{item.year || 'Unknown year'}</Typography>
        </Stack>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mb: 3, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.overview}</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button component={Link} to={route} variant="contained" color="primary" size="large">View Details</Button>
          <Button variant="outlined" size="large" onClick={onToggleWatchlist}>{isSaved ? 'Saved' : '+ Add to Watchlist'}</Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default HeroBanner;
