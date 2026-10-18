import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Box sx={{ py: 8, textAlign: 'center' }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h3" sx={{ fontWeight: 800 }}>404</Typography>
        <Typography variant="h5">This page is missing from the reel.</Typography>
        <Typography variant="body1" color="text.secondary">
          The title or route you requested could not be found.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Back to home
        </Button>
      </Stack>
    </Box>
  );
}

export default NotFound;
