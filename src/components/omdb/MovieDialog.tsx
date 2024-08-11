// React Imports
import React from 'react';

// MUI Imports
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';

// Types Imports
import { OMDBTitleResponse } from '@/types/omdb/responseType';

// Components Imports
import EpisodesList from './EpisodesList';
import MovieCardContent from './MovieCardContent';
import MovieCardMedia from './MovieCardMedia';

interface MovieDialogProps {
  open: boolean;
  movie?: OMDBTitleResponse | null;
  onClose: () => void;
  loading: boolean;
}

const MovieDialog: React.FC<MovieDialogProps> = ({ open, movie, onClose, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll={'body'}
    >
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
            height: 'auto',
            overflowY: 'auto',
          }}
        >
          {/* Movie Content */}
          <MovieCardMedia movie={movie} />

          {/* Movie Details and Episodes */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: 2,
              backgroundColor: 'background.paper',
              overflowY: 'auto',
            }}
          >
            <MovieCardContent movie={movie} />
            {/* Episodes List */}
            {movie?.Type === 'series' && (
              <Box sx={{ mt: 2 }}>
                <EpisodesList seriesId={movie?.imdbID || ''} totalSeasons={movie?.totalSeasons || 0} />
              </Box>
            )}
          </Box>
        </Box>
      </Fade>
    </Dialog>
  );
};

export default MovieDialog;
