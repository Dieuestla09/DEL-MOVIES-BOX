import { Box, Button, Stack, Typography } from '@mui/material';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';

function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 220, width: '100%', px: 3 }}>
      <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', maxWidth: 460 }}>
        <SearchOffOutlinedIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{message}</Typography>
        {actionLabel && onAction ? <Button variant="contained" onClick={onAction}>{actionLabel}</Button> : null}
      </Stack>
    </Box>
  );
}

export default EmptyState;
