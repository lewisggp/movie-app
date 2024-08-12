'use client';

// React Imports
import { useState, useCallback, useEffect } from 'react';

// Types Imports
import type { OMDBSearchRequest } from '@/types/omdb/requestType';
import type { OMDBMovieResponse } from '@/types/omdb/responseType';

// API Imports
import { searchMovies } from '@/services/omdb.api';

// Component Imports
import MovieList from '@/components/omdb/MovieList';
import Header from '@/components/layout/horizontal/Header';

// MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// Context Imports
import { useSearch } from '@/contexts/searchProvider';

export default function OMDBMovieList() {
  const { query, genre, year } = useSearch();
  const [searchResults, setSearchResults] = useState<OMDBMovieResponse[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchMovies = async (query: string, genre?: string, year?: Date, page: number = 1) => {
    setLoading(true);
    const fullQuery = genre ? `${query} ${genre}` : query;
    const yearString = year ? year.getFullYear().toString() : '';

    try {
      const request: OMDBSearchRequest = { s: fullQuery, page: String(page) };
      if (yearString) request.y = yearString;

      const response = await searchMovies(request);

      if (response.Response === "True" && Array.isArray(response.Search)) {
        if (page === 1) {
          setSearchResults(response.Search);
        } else {
          setSearchResults(prevResults => [...prevResults, ...response.Search]);
        }
        setHasMore(response.Search.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError('Failed to search for movies');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    if (bottom) {
      setPage(prevPage => {
        const newPage = prevPage + 1;
        fetchMovies(query, genre, year || undefined, newPage);
        return newPage;
      });
    }
  }, [loading, hasMore, query, year]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

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
      {loading && !searchResults.length ? (
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
          {loading && hasMore && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 3 }}>
              <CircularProgress />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
