import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function BrandLogo({ showTagline = false }) {
  return (
    <Stack
      component={Link}
      to="/"
      direction="row"
      spacing={1}
      alignItems="center"
      aria-label="DEL MOVIE BOX home"
      title="DEL MOVIE BOX"
      sx={{ textDecoration: 'none', color: 'inherit', minWidth: 0 }}
    >
      <Box
        component="svg"
        viewBox="0 0 32 32"
        role="img"
        aria-label="DEL MOVIE BOX play icon"
        sx={{ width: 30, height: 30, flexShrink: 0 }}
      >
        <rect x="2.5" y="2.5" width="27" height="27" rx="6" fill="none" stroke="#FFB224" strokeWidth="2.5" />
        <path d="M13 9.5 23 16l-10 6.5z" fill="#FFB224" />
      </Box>
      <Stack spacing={showTagline ? 0 : 0.1} sx={{ minWidth: 0 }}>
        <Typography
          component="span"
          sx={{
            fontFamily: 'Poppins, Inter, sans-serif',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            fontWeight: 800,
            lineHeight: 1.15,
            whiteSpace: 'nowrap',
          }}
        >
          <Box component="span" sx={{ color: '#FFB224' }}>DEL</Box>
          {' '}
          <Box component="span" sx={{ color: '#F2F4F8' }}>MOVIE BOX</Box>
        </Typography>
        {showTagline ? (
          <Typography component="span" variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
            Discover. Save. Watch next.
          </Typography>
        ) : null}
      </Stack>
    </Stack>
  );
}

export default BrandLogo;
