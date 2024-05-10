import React from 'react';
import { Box } from '@material-ui/core';
import Navbar from '../components/Navbar';
import SearchForm from '../components/SearchForm';
import CocktailList from '../components/CocktailList';

function Home() {
  return (
    <Box>
      <Box mb={4}>
        <SearchForm />
      </Box>
      <Box mt={4}>
        <CocktailList />
      </Box>
    </Box>
  );
}

export default Home;