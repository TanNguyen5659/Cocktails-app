import React from 'react';
import { Typography, List, ListItem } from '@material-ui/core';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <>
      <div className="section about-section">
        <Typography variant="h4" component="h2" gutterBottom>About Cocktail Recipes</Typography>
        <Typography variant="body1" gutterBottom>Welcome to our Cocktail Recipes website! Here, you'll find a delightful collection of cocktail recipes to tantalize your taste buds and impress your guests.</Typography>
        <Typography variant="body1" gutterBottom>Whether you're a seasoned mixologist or a beginner looking to try your hand at crafting delicious drinks, our carefully curated collection has something for everyone.</Typography>
      </div>
    </>
  );
}