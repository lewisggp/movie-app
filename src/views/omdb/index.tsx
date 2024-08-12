'use client';

// React Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Component Imports
import Header from '@/components/layout/horizontal/Header';
import MovieSuggestions from '@/components/omdb/MovieSuggestions';

export default function HomePage() {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 6,
        pt: 14,
      }}
    >
      <Box
        sx={{
          width: '100%',
          backgroundColor: 'secondary.main',
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          mt: 4,
          boxShadow: 'inset 0px -4px 6px rgba(0, 0, 0, 0.5)', 
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'left',
          }}
        >
          Secciones Recomendadas
        </Typography>
      </Box>
      <MovieSuggestions />
    </Box>
  );
}
