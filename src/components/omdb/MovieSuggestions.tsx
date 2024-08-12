// React Imports
import { useState } from 'react';

// MUI Imports
import Box from '@mui/material/Box';

// Components Imports
import MovieSlider from '@/components/omdb/MovieSlider';
import MovieDialog from '@/components/omdb/MovieDialog';

// Types Imports
import { OMDBTitleResponse } from '@/types/omdb/responseType';

// API Imports
import { fetchMovie } from '@/services/omdb.api';

const MovieSuggestions = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<OMDBTitleResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const handleMovieClick = async (id: string) => {
        setLoading(true);
        setDialogOpen(true);
        try {
            const movieDetails = await fetchMovie({ i: id });
            setSelectedMovie(movieDetails);
        } catch (error) {
            setSelectedMovie(null);
        } finally {
            setLoading(false);
        }
    };
    
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedMovie(null);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <MovieSlider title="Marvel" onMovieClick={handleMovieClick} />
            <MovieSlider title="Harry Potter" onMovieClick={handleMovieClick} />
            <MovieSlider title="Star Wars" onMovieClick={handleMovieClick} />
            
            <MovieDialog
                open={dialogOpen}
                movie={selectedMovie}
                onClose={handleCloseDialog}
                loading={loading}
            />
        </Box>
    );
};

export default MovieSuggestions;
