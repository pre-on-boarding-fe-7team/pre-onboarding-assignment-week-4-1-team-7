import { Box, CircularProgress } from '@mui/material';

const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: 3,
    }}
  >
    <CircularProgress />
  </Box>
);

export default Loading;
