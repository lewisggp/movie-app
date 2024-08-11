// React Imports
import React, { useState, useEffect } from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

// Components Imports
import EpisodeCard from './EpisodeCard';

// Types Imports
import { OMDBSeasonResponse, OMDBTitleResponse } from '@/types/omdb/responseType';

// API Imports
import { fetchMovie, fetchSeason } from '@/services/omdb.api';

interface EpisodesListProps {
  seriesId: string;
  totalSeasons: number;
}

const EpisodesList: React.FC<EpisodesListProps> = ({ seriesId, totalSeasons }) => {
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [season, setSeason] = useState<OMDBSeasonResponse | null>(null);
  const [episodes, setEpisodes] = useState<OMDBTitleResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSeasonData = async () => {
      try {
        const fetchedSeason = await fetchSeason({ i: seriesId }, `${selectedSeason}`);
        setSeason(fetchedSeason);
      } catch (error) {
        console.error('Error fetching season:', error);
        setSeason(null);
      }
    };

    fetchSeasonData();
  }, [seriesId, selectedSeason]);

  useEffect(() => {
    const fetchEpisodesData = async () => {
      if (!season?.Episodes) return;

      setLoading(true);

      try {
        const episodePromises = season.Episodes.map(async (episode) => {
          try {
            const episodeResponse = await fetchMovie({ i: episode.imdbID });
            return episodeResponse;
          } catch (error) {
            console.error('Error fetching episode:', error);
            return null;
          }
        });

        const episodesData = await Promise.all(episodePromises);
        const validEpisodes = episodesData.filter((ep): ep is OMDBTitleResponse => ep !== null);
        setEpisodes(validEpisodes);
      } catch (error) {
        console.error('Error fetching episodes:', error);
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodesData();
  }, [season]);

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Episodes
        </Typography>
        <Select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value as number)}
          fullWidth
          sx={{ width: 'auto' }}
        >
          {Array.from({ length: totalSeasons }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              Season {i + 1}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {episodes.map((episode, index) => (
            <EpisodeCard key={episode.imdbID} episode={episode} index={index} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default EpisodesList;
