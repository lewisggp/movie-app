// React Imports
import React from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// Component Imports
import MovieSearch from '@/components/omdb/MovieSearch';

// Styles
const StyledHeader = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 100,
  textAlign: 'left',
  padding: theme.spacing(2),
  background: theme.palette.background.default,
  color: theme.palette.common.white,
  boxShadow: theme.shadows[4],
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    height: 'auto',
    flexDirection: 'column',
    textAlign: 'center',
    padding: theme.spacing(1),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <StyledHeader>
      <Title variant="h1">{title}</Title>
      <MovieSearch />
    </StyledHeader>
  );
};

export default Header;
