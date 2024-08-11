'use client'

// React Imports
import { useState } from 'react';

// Types Imports
import type { OMDBSearchRequest } from '@/types/omdb/requestType';
import type { OMDBSearchResponse } from '@/types/omdb/responseType';

// API Imports
import { searchMovies } from '@/services/omdb.api';

// Component Imports
import MovieList from '@/components/omdb/MovieList';
import Header from '@/components/layout/horizontal/Header';

// MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function OMDBMovieList() {
  const [searchResults, setSearchResults] = useState<OMDBSearchResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovies = async (query: string, year?: string) => {
    setLoading(true);
    try {
      const request: OMDBSearchRequest = { s: query };
      if (year) request.y = year;

      const results = await searchMovies(request);

      setSearchResults(results);
      setError(null);
    } catch (err) {
      setError('Failed to search for movies');
    } finally {
      setLoading(false);
    }
  };

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
      <Header title="OMDB Movies" onSearch={fetchMovies} />
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {error && (
            <Typography variant="body1" color="error" gutterBottom>
              Error: {error}
            </Typography>
          )}
          <MovieList searchResults={searchResults} />
        </>
      )}
    </Box>
  );
}
