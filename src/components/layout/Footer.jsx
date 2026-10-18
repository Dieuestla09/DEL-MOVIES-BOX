import { Box, Link, Stack, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ mt: 8, py: 4, borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(20,24,33,0.6)' }}>
      <Stack spacing={1} alignItems="center" textAlign="center">
        <Typography variant="caption" color="text.secondary">
          © 2026 DEL MOVIE BOX
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </Typography>
        <Link href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" underline="hover" color="primary.main">
          TMDB
        </Link>
        <Typography variant="caption" color="text.secondary">
          Images provided by TMDB. All rights belong to their respective owners.
        </Typography>
      </Stack>
    </Box>
  );
}

export default Footer;
