// React Imports
import React, { useState } from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Components Imports
import MovieCard from '@/components/omdb/MovieCard';
import MovieDialog from '@/components/omdb/MovieDialog';

// Types Imports
import type { OMDBMovieResponse, OMDBTitleResponse } from '@/types/omdb/responseType';

// API Imports
import { fetchMovie } from '@/services/omdb.api';

interface ListProps {
  searchResults: OMDBMovieResponse[];
}

export default function MovieList({ searchResults }: ListProps) {
  const [selectedMovie, setSelectedMovie] = useState<OMDBTitleResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
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
    <Box
      sx={{
        padding: 2,
        margin: '0 auto',
        maxWidth: '1200px',
        textAlign: 'center',
      }}
    >
      {searchResults && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map(result => (
            <MovieCard key={result.imdbID} movie={result} onClick={handleMovieClick} />
          ))}
        </div>
      )}

      <MovieDialog
        open={dialogOpen}
        movie={selectedMovie}
        onClose={handleCloseDialog}
        loading={loading}
      />
    </Box>
  );
}
