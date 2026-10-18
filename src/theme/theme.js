import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFB224',
      contrastText: '#0B0D12',
    },
    secondary: {
      main: '#FF5C5C',
      contrastText: '#F2F4F8',
    },
    background: {
      default: '#0B0D12',
      paper: '#141821',
    },
    text: {
      primary: '#F2F4F8',
      secondary: '#9AA3B2',
    },
    divider: 'rgba(255,255,255,0.08)',
    success: { main: '#4ade80' },
    warning: { main: '#FFB224' },
    error: { main: '#FF5C5C' },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: { fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 700 },
    h2: { fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 700 },
    h3: { fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 700 },
    h4: { fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 700 },
    h5: { fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 700 },
    h6: { fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 700 },
    button: { fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#141821',
          color: '#F2F4F8',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#141821',
          color: '#F2F4F8',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1C2230',
          border: '1px solid rgba(255,255,255,0.04)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.22)',
          transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 16px 34px rgba(0,0,0,0.28)',
            borderColor: 'rgba(255,178,36,0.28)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'transform 180ms ease, box-shadow 180ms ease, filter 180ms ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            filter: 'brightness(1.04)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 999 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 18,
            backgroundColor: 'rgba(255,255,255,0.04)',
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            color: '#F2F4F8',
            borderRadius: 10,
          },
        },
      },
    },
  },
});

export default theme;
