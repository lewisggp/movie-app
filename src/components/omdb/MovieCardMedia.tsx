// React Imports
import React from 'react';

// MUI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// Type Imports
import { OMDBTitleResponse } from '@/types/omdb/responseType';

// Styled Badge Component
const Badge = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '0.75rem',
  boxShadow: `0 4px 8px rgba(0, 0, 0, 0.3)`,
}));

interface MovieCardMediaProps {
  movie?: OMDBTitleResponse | null;
}

const MovieCardMedia: React.FC<MovieCardMediaProps> = ({ movie }) => {
  if (!movie) {
    return (
      <Typography variant="h6" color="textSecondary">
        No data available
      </Typography>
    );
  }

  return (
    <Box sx={{ position: 'relative', height: '350px', overflow: 'hidden' }}>
      <img
        src={movie?.Poster !== 'N/A' ? movie?.Poster : '/no-image-available.jpg'}
        alt={movie?.Title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))',
          zIndex: 2,
        }}
      />
      {/* Badges with movie information */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          alignItems: 'center',
          zIndex: 3,
        }}
      >
        <Badge>{movie.imdbRating}/10</Badge>
        <Badge sx={{ textTransform: 'uppercase' }}>{movie.Type}</Badge>
      </Box>
    </Box>
  );
};

export default MovieCardMedia;
