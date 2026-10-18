import { Alert, Button, Stack } from '@mui/material';

function ErrorState({ message = 'Something went wrong. Please try again.', onRetry }) {
  return (
    <Stack spacing={2} alignItems="center" sx={{ py: 4 }}>
      <Alert severity="error" sx={{ width: '100%' }}>{message}</Alert>
      {onRetry ? <Button variant="contained" onClick={() => onRetry()}>Try again</Button> : null}
    </Stack>
  );
}

export default ErrorState;
