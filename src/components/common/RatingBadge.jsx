import { Box, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function RatingBadge({ rating = 0 }) {
  const safeRating = Number(rating || 0);
  const tone = safeRating >= 7 ? '#4ade80' : safeRating >= 5 ? '#FFB224' : '#FF5C5C';

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.4, borderRadius: 999, backgroundColor: 'rgba(17,24,39,0.8)', border: '1px solid rgba(255,255,255,0.08)', color: tone }}>
      <Stack direction="row" alignItems="center" spacing={0.25}>
        <StarIcon fontSize="small" sx={{ color: tone }} />
        <Typography variant="caption" fontWeight={700} sx={{ color: '#F2F4F8' }}>
          {safeRating.toFixed(1)}
        </Typography>
      </Stack>
    </Box>
  );
}

export default RatingBadge;
