import { Avatar, Box, Stack, Typography } from '@mui/material';

function CastList({ cast = [] }) {
  if (!cast.length) return null;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Cast</Typography>
      <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }} className="horizontal-scroll">
        {cast.map((person) => (
          <Box key={person.id} sx={{ minWidth: 120, textAlign: 'center' }}>
            <Avatar src={person.profileUrl || undefined} alt={person.name} sx={{ width: 84, height: 84, mx: 'auto', mb: 1, bgcolor: 'primary.main', color: '#0B0D12', fontWeight: 800 }}>
              {person.name?.charAt(0) || 'N'}
            </Avatar>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{person.name}</Typography>
            <Typography variant="caption" color="text.secondary">{person.character}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default CastList;
