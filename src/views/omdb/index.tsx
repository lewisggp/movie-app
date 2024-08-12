'use client';

// React Imports
import { useState, useCallback, useEffect } from 'react';

// Types Imports
import type { OMDBSearchRequest } from '@/types/omdb/requestType';
import type { OMDBMovieResponse } from '@/types/omdb/responseType';

// API Imports
import { fetchMovie, searchMovies } from '@/services/omdb.api';

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
    const fullQuery = query ? query : genre || '';
    const yearString = year ? year.getFullYear().toString() : '';

    try {
      const request: OMDBSearchRequest = { s: fullQuery, page: String(page) }; // API Doesnt support genre param :(
      if (yearString) request.y = yearString;

      const response = await searchMovies(request);

      if (response.Response === "True" && Array.isArray(response.Search)) {
        let filteredResults: OMDBMovieResponse[] = response.Search

        if (genre) {
          // Unfortunately, 
          // the OMDB API no soporta la busqueda por genero en sus parametres
          // Additionally, the search response type does not contain the genres of each result, 
          // so we have to fetch each result and compare if it contains the searched genre.
          // This is not optimal at all.
          // Maybe it would be better to change the API.

          const movieDetailsPromises = response.Search.map(async (movie) => {
            const details = await fetchMovie({i: movie.imdbID});
            return details;
          });

          const movieDetails = await Promise.all(movieDetailsPromises);

          filteredResults = movieDetails.filter(movie => movie.Genre && movie.Genre.split(", ").includes(genre));
        }

        if (page == 1) {
          setSearchResults(filteredResults);
        } else {
          setSearchResults(prevResults => [...prevResults, ...filteredResults]);
        }
        setHasMore(filteredResults.length > 0);
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

  const handleSearch = (query: string, genre?: string, year?: Date) => {
    setSearchResults([])
    fetchMovies(query, genre, year)
  }

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
  
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
  
    if (bottom) {
      setPage(prevPage => {
        const newPage = prevPage + 1;
        fetchMovies(query, genre, year || undefined, newPage);
        return newPage;
      });
    }
  }, [loading, hasMore, query, genre, year]);

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
      <Header title="OMDB Movies" onSearch={handleSearch} />
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
