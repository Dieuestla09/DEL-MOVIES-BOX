import { IconButton, Tooltip } from '@mui/material';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function WatchlistButton({ isSaved, onToggle, size = 'medium' }) {
  return (
    <Tooltip title={isSaved ? 'Remove from watchlist' : 'Add to watchlist'}>
      <IconButton
        aria-label={isSaved ? 'Remove from watchlist' : 'Add to watchlist'}
        onClick={(event) => {
          event.stopPropagation();
          onToggle?.(event);
        }}
        size={size}
        sx={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(10, 12, 18, 0.72)', border: '1px solid rgba(255,255,255,0.08)', color: isSaved ? '#FFB224' : '#F2F4F8', '&:hover': { backgroundColor: 'rgba(255,178,36,0.12)' } }}
      >
        {isSaved ? <BookmarkIcon fontSize={size} /> : <BookmarkBorderOutlinedIcon fontSize={size} />}
      </IconButton>
    </Tooltip>
  );
}

export default WatchlistButton;
