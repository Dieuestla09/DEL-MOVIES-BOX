import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { NavLink } from 'react-router-dom';
import BrandLogo from './BrandLogo.jsx';

const navItems = [
  { label: 'Home', to: '/', icon: HomeOutlinedIcon },
  { label: 'Movies', to: '/movies', icon: MovieOutlinedIcon },
  { label: 'TV Shows', to: '/tv', icon: LiveTvOutlinedIcon },
  { label: 'My Watchlist', to: '/watchlist', icon: BookmarkBorderOutlinedIcon },
];

function SideNav({ open, onClose }) {
  const nav = (
    <Stack sx={{ width: 240, pt: 1 }}>
      <Toolbar />
      <Stack sx={{ px: 2, pb: 2 }}>
        <BrandLogo showTagline />
      </Stack>
      <List>
        {navItems.map(({ label, to, icon: Icon }) => (
          <ListItem disablePadding key={to}>
            <ListItemButton component={NavLink} to={to} onClick={onClose} end={to === '/'} sx={{ mx: 1, borderRadius: 2, '&.active': { backgroundColor: 'rgba(255,178,36,0.12)', color: '#FFB224' } }}>
              <ListItemIcon sx={{ minWidth: 40 }}><Icon /></ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
    </Stack>
  );

  return (
    <>
      <Drawer variant="permanent" sx={{ display: { xs: 'none', lg: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, backgroundColor: '#141821' } }} open>
        {nav}
      </Drawer>
      <Drawer variant="temporary" open={open} onClose={onClose} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', lg: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 } }}>
        {nav}
      </Drawer>
    </>
  );
}

export default SideNav;
