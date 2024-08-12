// MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';

// Types Imports
import type { OMDBMovieResponse } from '@/types/omdb/responseType';

interface MovieCardProps {
  movie: OMDBMovieResponse;
  onClick?: (id: string) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <Card 
      className="group relative border rounded-lg overflow-hidden shadow-lg hover:scale-105"
      style={{ transition: 'transform 0.3s ease-in-out' }}
      onClick={() => onClick && onClick(movie.imdbID)}
    >
      <Box className="relative w-full h-[450px]">
        <CardMedia
          component="img"
          image={movie.Poster !== 'N/A' ? movie.Poster : '/no-image-available.jpg'}
          alt={movie.Title}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <Box className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></Box>
      </Box>
      <CardContent className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Typography className="text-lg font-semibold text-white">
          {movie.Title}
        </Typography>
      </CardContent>
    </Card>
  );
}
