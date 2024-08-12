// React Imports
import React from 'react';

// MUI Imports
import { Box, Typography, CardMedia } from '@mui/material';

// Types Imports
import { OMDBTitleResponse } from '@/types/omdb/responseType';

interface EpisodeCardProps {
  episode: OMDBTitleResponse;
  index: number;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, index }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        height: '150px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          width: '30%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <CardMedia
          component="img"
          height="100%"
          image={episode.Poster !== 'N/A' ? episode.Poster : '/no-image-available.jpg'}
          alt={episode.Title}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          ml: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" gutterBottom>
            Episodio {index + 1}: {episode.Title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {episode.Runtime}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          {episode.Plot !== 'N/A' ? episode.Plot : 'Descripción no disponible.'}
        </Typography>
      </Box>
    </Box>
  );
};

export default EpisodeCard;
