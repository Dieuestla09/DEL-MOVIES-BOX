import { Box, CircularProgress, Typography } from '@mui/material';
import { useWatchlist } from '../context/useWatchlist.js';
import { useFetch } from '../hooks/useFetch.js';
import HeroBanner from '../components/home/HeroBanner.jsx';
import ContentRow from '../components/common/ContentRow.jsx';
import { fetchActionMovies, fetchPopularMovies, fetchPopularTV, fetchTopRatedMovies, fetchTrending } from '../services/tmdb.js';

function Home() {
  const { items, toggleItem } = useWatchlist();
  const { data: trendingData, loading: loadingTrending, error: errorTrending, refetch: retryTrending } = useFetch(async () => fetchTrending(), [], { initialValue: [] });
  const { data: popularMoviesData, loading: loadingPopular, error: errorPopular, refetch: retryPopular } = useFetch(async () => fetchPopularMovies(), [], { initialValue: [] });
  const { data: actionMoviesData, loading: loadingAction, error: errorAction, refetch: retryAction } = useFetch(async () => fetchActionMovies(), [], { initialValue: [] });
  const { data: topRatedMoviesData, loading: loadingTopRated, error: errorTopRated, refetch: retryTopRated } = useFetch(async () => fetchTopRatedMovies(), [], { initialValue: [] });
  const { data: popularTVData, loading: loadingTV, error: errorTV, refetch: retryTV } = useFetch(async () => fetchPopularTV(), [], { initialValue: [] });

  const trending = trendingData || [];
  const popularMovies = popularMoviesData || [];
  const actionMovies = actionMoviesData || [];
  const topRatedMovies = topRatedMoviesData || [];
  const popularTV = popularTVData || [];
  const featuredItem = trending[0] || null;
  const isSaved = (mediaType, id) => items.some((item) => item.mediaType === mediaType && item.id === id);

  const handleToggle = (item) => {
    toggleItem(item);
  };

  if (loadingTrending && !trending.length) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>;
  }

  return (
    <Box>
      <HeroBanner item={featuredItem} isSaved={featuredItem ? isSaved(featuredItem.mediaType, featuredItem.id) : false} onToggleWatchlist={() => featuredItem && handleToggle(featuredItem)} />
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Tonight’s picks</Typography>
      <ContentRow title="Trending This Week" to="/movies" items={trending} loading={loadingTrending} error={errorTrending} onRetry={retryTrending} />
      <ContentRow title="Popular Movies" to="/movies" items={popularMovies} loading={loadingPopular} error={errorPopular} onRetry={retryPopular} />
      <ContentRow title="Top Rated Movies" to="/movies" items={topRatedMovies} loading={loadingTopRated} error={errorTopRated} onRetry={retryTopRated} />
      <ContentRow title="Action Movies" to="/movies" items={actionMovies} loading={loadingAction} error={errorAction} onRetry={retryAction} />
      <ContentRow title="Popular TV Shows" to="/tv" items={popularTV} loading={loadingTV} error={errorTV} onRetry={retryTV} />
    </Box>
  );
}

export default Home;
