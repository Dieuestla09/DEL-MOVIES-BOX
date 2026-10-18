import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Movies = lazy(() => import('./pages/Movies.jsx'));
const TVShows = lazy(() => import('./pages/TVShows.jsx'));
const Watchlist = lazy(() => import('./pages/Watchlist.jsx'));
const SearchResults = lazy(() => import('./pages/SearchResults.jsx'));
const Details = lazy(() => import('./pages/Details.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function App() {
  return (
    <Suspense fallback={<div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f2f4f8' }}>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movie/:id" element={<Details />} />
          <Route path="/tv/:id" element={<Details />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
