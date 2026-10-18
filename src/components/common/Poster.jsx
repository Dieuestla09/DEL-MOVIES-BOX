import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';

function Poster({ title, posterUrl, size = 260 }) {
  const [failedUrl, setFailedUrl] = useState(null);

  if (posterUrl && failedUrl !== posterUrl) {
    return (
      <Box
        component="img"
        src={posterUrl}
        alt={title || 'Movie poster'}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 2 }}
        onError={() => {
          setFailedUrl(posterUrl);
        }}
      />
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: size, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1, background: 'linear-gradient(180deg, rgba(255,178,36,0.18), rgba(255,92,92,0.18))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2, color: '#F2F4F8', textAlign: 'center', p: 2 }}>
      <MovieIcon sx={{ fontSize: 36, opacity: 0.9 }} />
      <Typography variant="caption" sx={{ color: '#F2F4F8', fontWeight: 600 }}>{title || 'No poster'}</Typography>
    </Box>
  );
}

export default Poster;
