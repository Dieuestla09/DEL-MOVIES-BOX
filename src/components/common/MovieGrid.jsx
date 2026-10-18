import { Grid } from '@mui/material';
import MovieCard from './MovieCard.jsx';

function MovieGrid({ items = [], onWatchlistToggle }) {
  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item xs={6} sm={4} md={3} key={`${item.mediaType}-${item.id}`}>
          <MovieCard item={item} onWatchlistToggle={onWatchlistToggle} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieGrid;
