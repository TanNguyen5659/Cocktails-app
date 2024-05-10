import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

export default function Cocktail({ image, name, id, info, glass }) {
  const savedRatings = window.localStorage.getItem(`ratings-${id}`);
  const initialRatings = savedRatings !== null ? JSON.parse(savedRatings) : [];
  const [allRatings, setAllRatings] = useState(initialRatings);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (allRatings.length > 0) {
      const total = allRatings.reduce((acc, curr) => acc + curr, 0);
      setRating(total / allRatings.length);
    }
  }, [allRatings]);

  const handleRatingChange = (event, newValue) => {
    const newRatings = [...allRatings, newValue];
    window.localStorage.setItem(`ratings-${id}`, JSON.stringify(newRatings));
    setAllRatings(newRatings);
  };

  return (
    <RouterLink to={`/cocktail/${id}`} style={{ textDecoration: 'none' }}>
      <Card style={{ maxWidth: 345, margin: 'auto', marginTop: 20 }}>
        <CardMedia
          component="img"
          style={{ height: 140, objectFit: 'contain' }}
          image={image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {glass}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {info}
          </Typography>
          <Rating
            name={`star-rating-${id}`}
            value={rating}
            onChange={handleRatingChange}
          />
          <Typography variant="body2" color="textSecondary" component="p">
            Average Rating: {rating.toFixed(1)}
          </Typography>
        </CardContent>
      </Card>
    </RouterLink>
  );
}