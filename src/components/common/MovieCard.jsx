import { Box, Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Poster from './Poster.jsx';
import RatingBadge from './RatingBadge.jsx';
import WatchlistButton from './WatchlistButton.jsx';
import { useWatchlist } from '../../context/useWatchlist.js';

function MovieCard({ item, onWatchlistToggle }) {
  const { isInWatchlist, toggleItem } = useWatchlist();
  const isSaved = item ? isInWatchlist(item.mediaType, item.id) : false;

  const handleToggle = () => {
    if (!item) return;
    const minimal = {
      id: item.id,
      mediaType: item.mediaType,
      title: item.title,
      posterUrl: item.posterUrl,
      rating: item.rating,
      year: item.year,
      genreIds: item.genreIds || [],
    };
    toggleItem(minimal);
    onWatchlistToggle?.(minimal);
  };

  if (!item) return null;

  const route = item.mediaType === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`;

  return (
    <Card sx={{ position: 'relative', overflow: 'hidden', height: '100%', borderRadius: 3, width: '100%', maxWidth: 180 }}>
      <CardActionArea component={Link} to={route} aria-label={`Open details for ${item.title}`} sx={{ display: 'block', height: '100%' }}>
        <Box sx={{ position: 'relative', height: 250 }}>
          <Poster title={item.title} posterUrl={item.posterUrl} size={250} />
          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,13,18,0.1) 25%, rgba(11,13,18,0.86) 100%)', opacity: 0, transition: 'opacity 0.2s ease' }} />
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ position: 'absolute', left: 8, right: 8, top: 8, zIndex: 2 }}>
            <Chip label={item.mediaType === 'tv' ? 'TV' : 'Movie'} size="small" sx={{ backgroundColor: 'rgba(17,24,39,0.85)', color: '#F2F4F8', border: '1px solid rgba(255,255,255,0.08)' }} />
            <RatingBadge rating={item.rating} />
          </Stack>
          <Box sx={{ position: 'absolute', left: 10, right: 10, bottom: 14, zIndex: 2, opacity: 0, transition: 'opacity 0.2s ease' }}>
            <Typography variant="subtitle2" sx={{ color: '#F2F4F8', fontWeight: 700, letterSpacing: '0.02em' }} className="text-truncate-two">
              {item.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">{item.year}</Typography>
          </Box>
        </Box>
      </CardActionArea>
      <Box sx={{ position: 'absolute', right: 8, top: 198, zIndex: 3 }}>
        <WatchlistButton isSaved={isSaved} onToggle={handleToggle} size="small" />
      </Box>
      <CardContent sx={{ p: 1.25, pt: 1.5, pb: '12px !important' }}>
        <Typography variant="subtitle2" className="text-truncate-two" sx={{ color: '#F2F4F8', minHeight: '2.8em' }}>
          {item.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">{item.year}</Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
