// Context Imports
import { SearchProvider } from '@/contexts/searchProvider'

// MUI Imports
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Third-party imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff5722',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#d6d6d6',
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
  },
});

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SearchProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <ToastContainer />
      </ThemeProvider>
    </SearchProvider>
  );
}

export default Providers
