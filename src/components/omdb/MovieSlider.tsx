// React Imports
import { useEffect, useState } from 'react';

// MUI Imports
import MovieCard from '@/components/omdb/MovieCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from '@mui/material/CircularProgress';

// Types Imports
import { OMDBSearchResponse } from '@/types/omdb/responseType';

// API Imports
import { searchMovies } from '@/services/omdb.api';

interface MovieSliderProps {
    title: string;
    onMovieClick: (id: string) => void;
}

const MovieSlider = ({ title, onMovieClick }: MovieSliderProps) => {
    const [searchResults, setSearchResults] = useState<OMDBSearchResponse>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadRecommendedMovies = async () => {
            setIsLoading(true);
            try {
                const movies = await searchMovies({ s: title });
                setSearchResults(movies);
            } catch (error) {
                console.error('Failed to fetch recommended movies', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadRecommendedMovies();
    }, [title]);

    const handlePrevClick = () => {
        if (searchResults && searchResults.Search.length > 0) {
            const newMovies = [...searchResults.Search];
            const lastMovie = newMovies.pop();
            if (lastMovie) {
                newMovies.unshift(lastMovie);
            }
            setSearchResults({ ...searchResults, Search: newMovies });
        }
    };

    const handleNextClick = () => {
        if (searchResults && searchResults.Search.length > 0) {
            const newMovies = [...searchResults.Search];
            const firstMovie = newMovies.shift();
            if (firstMovie) {
                newMovies.push(firstMovie);
            }
            setSearchResults({ ...searchResults, Search: newMovies });
        }
    };

    return (
        <Box sx={{ width: '100%', py: 4, position: 'relative' }}>
            <Typography
                variant="h6"
                color="textSecondary"
                sx={{ fontWeight: 'bold', mb: 1}}
            >
                {title}
            </Typography>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'visible'
                    }}
                >
                    <IconButton
                        onClick={handlePrevClick}
                        aria-label="previous"
                        sx={{
                            position: 'absolute',
                            left: 0,
                            zIndex: 2,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            },
                        }}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Box
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                            justifyContent: 'space-between',
                            gap: 2
                        }}
                    >
                        {searchResults?.Search && searchResults?.Search.slice(0, 5).map((movie) => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                                sx={{ width: '300px', height: '200px',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        zIndex: 1,
                                    },
                                }}
                                onClick={() => onMovieClick(movie.imdbID)}
                            />
                        ))}
                    </Box>
                    <IconButton
                        onClick={handleNextClick}
                        aria-label="next"
                        sx={{
                            position: 'absolute',
                            right: 0,
                            zIndex: 2,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            },
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default MovieSlider;
