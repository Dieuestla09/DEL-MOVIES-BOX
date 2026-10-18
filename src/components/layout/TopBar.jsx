import { useState } from 'react';
import { AppBar, Badge, IconButton, InputAdornment, Stack, TextField, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useWatchlist } from '../../context/useWatchlist.js';
import BrandLogo from './BrandLogo.jsx';

function TopBar({ onMenuClick }) {
  const navigate = useNavigate();
  const { items } = useWatchlist();
  const [term, setTerm] = useState('');

  const submitSearch = () => {
    const clean = term.trim();
    if (!clean) return;
    navigate(`/search?q=${encodeURIComponent(clean)}`);
  };

  return (
    <AppBar position="sticky" sx={{ top: 0, zIndex: 1200 }}>
      <Toolbar sx={{ minHeight: { xs: 72, md: 84 }, px: { xs: 2, md: 3 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%', gap: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexShrink: 0 }}>
            <IconButton aria-label="Open navigation" onClick={onMenuClick} sx={{ display: { xs: 'inline-flex', lg: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <BrandLogo />
          </Stack>

          <TextField
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                submitSearch();
              }
            }}
            placeholder="Search titles, people, or genres"
            size="small"
            fullWidth
            sx={{ maxWidth: { xs: 220, md: 420 }, ml: 'auto', mr: 1 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>,
              endAdornment: term ? <InputAdornment position="end"><IconButton size="small" aria-label="Clear search" onClick={() => setTerm('')}><CloseIcon fontSize="small" /></IconButton></InputAdornment> : null,
            }}
          />

          <IconButton aria-label="Search" onClick={submitSearch} sx={{ display: { xs: 'inline-flex', md: 'none' } }}>
            <SearchIcon />
          </IconButton>

          <IconButton component={Link} to="/watchlist" aria-label="Open watchlist" sx={{ position: 'relative', ml: 0.5 }}>
            <Badge badgeContent={items.length} color="primary" overlap="circular">
              <BookmarkBorderOutlinedIcon />
            </Badge>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
