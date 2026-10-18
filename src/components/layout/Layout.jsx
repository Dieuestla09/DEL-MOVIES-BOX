import { Box, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopBar from './TopBar.jsx';
import SideNav from './SideNav.jsx';
import Footer from './Footer.jsx';
import { DEL_MOVIE_BOX } from '../../constants.js';

const pageTitles = {
  '/': 'Home',
  '/movies': 'Movies',
  '/tv': 'TV Shows',
  '/watchlist': 'My Watchlist',
  '/search': 'Search',
  '/404': 'Not Found',
};

function Layout() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/movie/') || location.pathname.startsWith('/tv/')) return;
    const title = pageTitles[location.pathname]
      || 'Not Found';
    document.title = `${title} | ${DEL_MOVIE_BOX}`;
  }, [location.pathname]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#0B0D12' }}>
      <TopBar onMenuClick={() => setDrawerOpen(true)} />
      <SideNav open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Box component="main" sx={{ width: { xs: '100%', lg: 'calc(100% - 240px)' }, ml: { xs: 0, lg: '240px' } }}>
        <Toolbar sx={{ minHeight: { xs: 12, md: 18 } }} />
        <Box sx={{ px: { xs: 2, sm: 3, lg: 4 }, pb: 4 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default Layout;
