'use client';

// React Imports
import { useState, useCallback, useEffect } from 'react';

// Types Imports
import type { OMDBSearchRequest } from '@/types/omdb/requestType';
import type { OMDBMovieResponse } from '@/types/omdb/responseType';

// API Imports
import { fetchMovie, searchMovies } from '@/services/omdb.api';

// Component Imports
import Header from '@/components/layout/horizontal/Header';
import MovieList from '@/components/omdb/MovieList';

// MUI Imports
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// Context Imports
import { useSearch } from '@/contexts/searchProvider';
import { Typography } from '@mui/material';

export default function OMDBMovieSearch() {
    // States
    const [searchResults, setSearchResults] = useState<OMDBMovieResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    // Contexts
    const { query, genre, year,
        searchInitiated, setSearchInitiated } = useSearch();

    useEffect(() => {
        setPage(1)
        setSearchResults([])
        setSearchInitiated(false);
        fetchMovies();
    }, [searchInitiated]);

    const fetchMovies = async (page: number = 1) => {
        if (query == '' && genre == '') return;

        setLoading(true);

        const fullQuery = query ? query : genre || '';
        const yearString = year ? year.getFullYear().toString() : '';

        try {
            const request: OMDBSearchRequest = { s: fullQuery, page: String(page) };
            if (yearString) request.y = yearString;

            console.log("request", request)

            const response = await searchMovies(request);

            if (response.Response === "True" && Array.isArray(response.Search)) {
                let filteredResults: OMDBMovieResponse[] = response.Search;

                if (genre) {
                    const movieDetailsPromises = response.Search.map(async (movie) => {
                    const details = await fetchMovie({ i: movie.imdbID });
                    return details;
                });

                const movieDetails = await Promise.all(movieDetailsPromises);

                filteredResults = movieDetails.filter(movie => movie.Genre && movie.Genre.split(", ").includes(genre));
                }

                if (page === 1) {
                    setSearchResults(filteredResults);
                } else {
                    setSearchResults(prevResults => [...prevResults, ...filteredResults]);
                }
                setHasMore(filteredResults.length > 0);
            } else {
                setHasMore(false);
            }
            } catch (err) {
                setHasMore(false);
            } finally {
                setLoading(false);
        }
    };

    const handleScroll = useCallback(() => {
        if (loading || !hasMore) return;

        const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;

        if (bottom) {
            setPage(prevPage => prevPage + 1);
        }
    }, [loading, hasMore]);

    useEffect(() => {
        if (page > 1) {
            fetchMovies(page);
        }
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <Box sx={{
                backgroundColor: 'background.paper',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 6,
                pt: 14,
        }}>
            {searchResults.length === 0 && !loading && (
                <Typography variant="h6" color="textSecondary" sx={{ mt: 4 }}>
                    No se encontraron resultados
                </Typography>
            )}
            <MovieList searchResults={searchResults} />
            {loading && hasMore && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 3 }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
}
