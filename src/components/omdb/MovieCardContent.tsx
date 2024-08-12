// React Imports
import React from 'react';

// MUI Imports
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// Type Imports
import { OMDBTitleResponse } from '@/types/omdb/responseType';

interface MovieContentProps {
  movie?: OMDBTitleResponse | null;
}

const MovieCardContent: React.FC<MovieContentProps> = ({ movie }) => {
  const sanitizeYear = (year?: string): string => {
    if (!year) return '';
    
    return year.split('–')[0];
  };

  const textSecondary = (movie?: OMDBTitleResponse): string => {
    if (movie?.Type === 'series' && movie?.totalSeasons){
      if(movie?.totalSeasons && movie?.totalSeasons > 1) {
        return `${movie?.totalSeasons} Seasons`
      }
      return `${movie?.totalSeasons} Season`
    }
    return movie?.Runtime && movie.Runtime != 'N/A' ? movie.Runtime : ''
  }

  if (!movie) {
    return (
      <Typography variant="h6" color="textSecondary">
        No data available
      </Typography>
    );
  }
  
  return (    
    <Grid container spacing={2}>
      {/* First Column */}
      <Grid item xs={12} sm={8}>
        <Typography variant="body2" color="secondary">
          {sanitizeYear(movie?.Year)} {textSecondary(movie)}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 1 }}>
          {movie?.Title}
        </Typography>
        {movie.Plot && movie.Plot !== 'N/A' && (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {movie.Plot}
          </Typography>
        )}
      </Grid>

      {/* Second Column */}
      <Grid item xs={12} sm={4}>
        <Typography variant="body2" color="textSecondary">
          <strong>Genre: </strong>
          <span style={{ color: '#fff' }}>{movie?.Genre}</span>
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
          <strong>Director: </strong>
          <span style={{ color: '#fff' }}>{movie?.Director}</span>
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
          <strong>Actors: </strong>
          <span style={{ color: '#fff' }}>{movie?.Actors}</span>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MovieCardContent;
