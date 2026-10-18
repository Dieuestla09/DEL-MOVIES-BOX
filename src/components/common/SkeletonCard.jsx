import { Box, Skeleton } from '@mui/material';

function SkeletonCard() {
  return (
    <Box sx={{ width: 180, minWidth: 180, flexShrink: 0 }}>
      <Skeleton variant="rectangular" width="100%" height={250} sx={{ borderRadius: 2 }} />
      <Skeleton height={24} sx={{ mt: 1.5 }} />
      <Skeleton height={18} width="60%" sx={{ mt: 0.5 }} />
    </Box>
  );
}

export default SkeletonCard;
