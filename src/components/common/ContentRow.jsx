import { useRef } from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard.jsx';
import SkeletonCard from './SkeletonCard.jsx';
import ErrorState from './ErrorState.jsx';
import EmptyState from './EmptyState.jsx';

function ContentRow({ title, to, items = [], loading = false, error = null, onRetry, emptyMessage = 'No items to show.' }) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({ left: direction * 260, behavior: 'smooth' });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>{title}</Typography>
        <Button component={Link} to={to} sx={{ color: 'text.secondary' }}>See all</Button>
      </Stack>

      {loading ? (
        <Stack direction="row" spacing={2} sx={{ overflow: 'hidden' }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </Stack>
      ) : error ? (
        <ErrorState message={error.message || 'Failed to load this row.'} onRetry={onRetry} />
      ) : items.length === 0 ? (
        <EmptyState title="Nothing here yet" message={emptyMessage} />
      ) : (
        <Box sx={{ position: 'relative' }}>
          <IconButton size="small" onClick={() => handleScroll(-1)} sx={{ position: 'absolute', left: -8, top: '35%', backgroundColor: 'rgba(17,24,39,0.78)', zIndex: 2 }}>
            <ChevronLeftOutlinedIcon />
          </IconButton>
          <Box ref={scrollRef} className="horizontal-scroll" sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1, px: 4 }}>
            {items.map((item) => (
              <Box key={`${item.mediaType}-${item.id}`} sx={{ flex: '0 0 auto' }}>
                <MovieCard item={item} />
              </Box>
            ))}
          </Box>
          <IconButton size="small" onClick={() => handleScroll(1)} sx={{ position: 'absolute', right: -8, top: '35%', backgroundColor: 'rgba(17,24,39,0.78)', zIndex: 2 }}>
            <ChevronRightOutlinedIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default ContentRow;
