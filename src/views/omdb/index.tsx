'use client'

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

export default function OMDBMovieList() {
  const [searchResults, setSearchResults] = useState<OMDBMovieResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState<string>(''); // Estado para almacenar la query
  const [year, setYear] = useState<string | undefined>(undefined); // Estado para almacenar el año

  const fetchMovies = async (query: string, year?: string, page: number = 1) => {
    setLoading(true);
    setQuery(query);  // Actualiza el estado de la query
    setYear(year);    // Actualiza el estado del año (si existe)
    try {
      const request: OMDBSearchRequest = { s: query, page: String(page) };
      if (year) request.y = year;
  
      const response = await searchMovies(request);
  
      if (response.Response === "True" && Array.isArray(response.Search)) {
        if (page === 1) {
          setSearchResults(response.Search);
        } else {
          setSearchResults(prevResults => [...prevResults, ...response.Search]);
        }
        setHasMore(response.Search.length > 0); // Verifica si hay más resultados
      } else {
        setError('No movies found or unexpected response format');
        setHasMore(false); // Si no hay resultados, no hay más para cargar
      }
    } catch (err) {
      setError('Failed to search for movies');
      setHasMore(false); // En caso de error, detener la carga adicional
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
        fetchMovies(query, year, newPage);  // Usa los estados almacenados de query y year
        return newPage;
      });
    }
  }, [loading, hasMore, query, year]); // Dependencias actualizadas

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
