import React from 'react';
import { Grid, Typography, CircularProgress, Container, Box, IconButton } from '@material-ui/core';
import { useGlobalContext } from '../src/context';
import Cocktail from './Cocktail';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './CocktailList.css';

export default function CocktailList() {
  const { cocktails, loading } = useGlobalContext();
  const scrollContainer = React.useRef();

  const scroll = (scrollOffset) => {
    scrollContainer.current.scrollLeft += scrollOffset;
  };

  // Add state for all ratings
  const [allRatings, setAllRatings] = React.useState(() => {
    const savedRatings = window.localStorage.getItem(`ratings-${cocktails.id}`);
    return savedRatings !== null ? JSON.parse(savedRatings) : [];
  });
  const [rating, setRating] = React.useState(0);

  // Calculate average rating
  React.useEffect(() => {
    if (allRatings.length > 0) {
      const total = allRatings.reduce((acc, curr) => acc + curr, 0);
      setRating(total / allRatings.length);
    }
  }, [allRatings]);

  // Handle rating change
  const handleRatingChange = (event, newValue) => {
    const newRatings = [...allRatings, newValue];
    window.localStorage.setItem(`ratings-${cocktails.id}`, JSON.stringify(newRatings));
    setAllRatings(newRatings);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (cocktails.length < 1) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h5">No cocktails matched your search criteria</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={() => scroll(-200)}>
            <ArrowBackIosIcon />
          </IconButton>
          <Box flexGrow={1} overflow="auto" className="cocktail-list" ref={scrollContainer}>
            {cocktails.map((cocktail) => (
              <Box className="cocktail-item" key={cocktail.id}>
                <Cocktail {...cocktail} rating={rating} onRatingChange={handleRatingChange} />
              </Box>
            ))}
          </Box>
          <IconButton onClick={() => scroll(200)}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
}