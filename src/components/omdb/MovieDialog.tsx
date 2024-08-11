// React Imports
import React from 'react';

// MUI Imports
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';

// Types Imports
import { OMDBTitleResponse } from '@/types/omdb/responseType';

interface MovieDialogProps {
  open: boolean;
  movie?: OMDBTitleResponse | null;
  onClose: () => void;
  loading: boolean;
}

const MovieDialog: React.FC<MovieDialogProps> = ({ open, movie, onClose, loading }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Loading Fade */}
      <Fade in={loading} timeout={{ enter: 300, exit: 300 }}>
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'background.paper',
            zIndex: loading ? 1 : -1,
          }}
        >
          <CircularProgress />
        </Box>
      </Fade>

      {/* Content Fade */}
      <Fade in={!loading && !!movie} timeout={{ enter: 300, exit: 300 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '600px',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: '350px',
              overflow: 'hidden',
            }}
          >
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
              }}
            />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              padding: 2,
              backgroundColor: 'background.paper',
              overflowY: 'auto',
            }}
          >
            <Grid container spacing={2}>
              {/* Primera Columna */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="secondary">
                  {movie?.Year} - {movie?.imdbRating}/10
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                  {movie?.Title}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  {movie?.Plot}
                </Typography>
              </Grid>

              {/* Segunda Columna */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Genre: </strong>
                  <span style={{ color: '#fff' }}>{movie?.Genre}</span>
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                  <strong>Director: </strong>
                  <span style={{ color: '#fff' }}>{movie?.Director}</span>
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                  <strong>Writer: </strong>
                  <span style={{ color: '#fff' }}>{movie?.Writer}</span>
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                  <strong>Actors: </strong>
                  <span style={{ color: '#fff' }}>{movie?.Actors}</span>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Fade>
    </Dialog>
  );
};

export default MovieDialog;
