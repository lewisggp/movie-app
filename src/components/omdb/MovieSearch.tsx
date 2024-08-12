// React Imports
import React, { useEffect, useState } from 'react';

// Next Imports
import { useRouter } from 'next/navigation';

// MUI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

// Third-party imports
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Contexts
import { useSearch } from '@/contexts/searchProvider';

// API Imports
import { fetchGenres } from '@/services/omdb.api';

const MovieSearch: React.FC = () => {
  // Hooks
  const router = useRouter();

  // States
  const [genres, setGenres] = useState<string[]>([]);

  // Contexts
  const { 
    query, setQuery, 
    genre, setGenre, 
    year, setYear, 
    clearAll, setSearchInitiated 
  } = useSearch();

  useEffect(() => {
    const loadGenres = async () => {
      const genresFromApi = await fetchGenres();
      setGenres(genresFromApi);
    };

    loadGenres();
  }, []);

  const handleClear = () => {
    clearAll()
    router.push(`/omdb`);
  };

  const handleSearch = () => {
    if (!query.trim() && !genre) {
      toast.error('Please enter a valid query');
      return;
    }

    setSearchInitiated(true);
    router.push(`/omdb/search`);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        gap: 2, 
        alignItems: 'center', 
        flexWrap: 'wrap',
        maxWidth: '100%'
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ flexGrow: 1, maxWidth: 90, height: '56px' }}
      />
      <FormControl variant="outlined" sx={{ minWidth: 90 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          label="Genre"
          sx={{ height: '56px' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {genres.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <DatePicker
          selected={year}
          onChange={(date: Date | null) => setYear(date)}
          showYearPicker
          dateFormat="yyyy"
          customInput={<TextField label="Year" fullWidth sx={{ maxWidth: 90, height: '56px' }} />}
          yearItemNumber={12}
          scrollableYearDropdown
        />
      </Box>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClear}
        sx={{ height: '56px', minWidth: 90 }}
      >
        Clear All
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSearch}
        sx={{
          height: '56px',
          minWidth: 90,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px'
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default MovieSearch;
