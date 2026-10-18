import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import MovieGrid from '../components/common/MovieGrid.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { useWatchlist } from '../context/useWatchlist.js';

function Watchlist() {
  const { items, addItem, clearAll } = useWatchlist();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [lastRemoved, setLastRemoved] = useState(null);

  const handleUndo = () => {
    if (!lastRemoved) return;
    addItem(lastRemoved);
    setToastOpen(false);
  };

  const handleWatchlistToggle = (item) => {
    const wasSaved = items.some((saved) => saved.mediaType === item.mediaType && saved.id === item.id);
    if (!wasSaved) return;
    setLastRemoved(item);
    setToastOpen(true);
  };

  if (!items.length) {
    return (
      <Box sx={{ py: 6 }}>
        <EmptyState title="Your watchlist is empty" message="Browse movies and tap the bookmark to save favourites." actionLabel="Back home" onAction={() => (window.location.href = '/')} />
        <Snackbar
          open={toastOpen}
          autoHideDuration={3000}
          onClose={() => setToastOpen(false)}
          message={lastRemoved ? `${lastRemoved.title} removed from watchlist` : 'Removed from watchlist'}
          action={<Button color="primary" onClick={handleUndo}>Undo</Button>}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">My Watchlist</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" color="text.secondary">{items.length} saved</Typography>
          <Button color="error" onClick={() => setDialogOpen(true)}>Clear all</Button>
        </Stack>
      </Stack>

      <MovieGrid items={items} onWatchlistToggle={handleWatchlistToggle} />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Clear watchlist?</DialogTitle>
        <DialogContent>
          <DialogContentText>This will remove every saved title from your watchlist.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={() => { clearAll(); setDialogOpen(false); }}>Clear all</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        message={lastRemoved ? `${lastRemoved.title} removed from watchlist` : 'Removed from watchlist'}
        action={<Button color="primary" onClick={handleUndo}>Undo</Button>}
      />
    </Box>
  );
}

export default Watchlist;
