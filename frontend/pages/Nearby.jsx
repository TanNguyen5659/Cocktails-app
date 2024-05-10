import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Paper, CircularProgress, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Navbar from '../components/Navbar';
import { Nav } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#03a9f4',
    },
  },
});

const Nearby = () => {
  const classes = useStyles();
  const [places, setPlaces] = useState([]);
  const [photos, setPhotos] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchPhotos = async (fsq_id) => {
    const response = await fetch(`https://api.foursquare.com/v3/places/${fsq_id}/photos`, {
      headers: {
        'Authorization': 'fsq3I2HVQspI1xt5iZuvunoMyyNsYOefZLHIN0DbhrdU9JI=',
        'accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Response status:', response.status);
      return;
    }

    const data = await response.json();
    return data.results;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`https://api.foursquare.com/v3/places/search?query=cocktails`, {
        headers: {
          'Authorization': 'fsq3I2HVQspI1xt5iZuvunoMyyNsYOefZLHIN0DbhrdU9JI=',
          'accept': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Response status:', response.status);
        return;
      }

      const data = await response.json();
      setPlaces(data.results);

      const photosPromises = data.results.map(place => fetchPhotos(place.fsq_id));
      const photosResults = await Promise.all(photosPromises);

      const photosObj = photosResults.reduce((acc, curr, idx) => {
        acc[data.results[idx].fsq_id] = curr;
        return acc;
      }, {});

      setPhotos(photosObj);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className={classes.loading}><CircularProgress /></div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <div className={classes.root}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Best Nearby Cocktails Restaurants
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={false} sm={1} />
            <Grid item xs={12} sm={10}>
              {places.map((place) => (
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Card key={place.fsq_id}>
                      <CardContent>
                        <Typography variant="h5" component="h2" color="secondary">
                          {place.name}
                        </Typography>
                        <Typography color="textSecondary">
  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.location.address)}`} target="_blank" rel="noopener noreferrer">
    {place.location.address}
  </a>
</Typography>
                        <Typography color="textSecondary">
                          {place.location.locality}, {place.location.region} {place.location.postcode}
                        </Typography>
                        <Typography color="textSecondary">
                          Categories: {place.categories.map(category => category.name).join(', ')}
                        </Typography>
                        {photos[place.fsq_id] && photos[place.fsq_id].map(photo => (
                          <img src={`${photo.prefix}${photo.suffix}`} alt={place.name} key={photo.id} />
                        ))}
                      </CardContent>
                    </Card>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={false} sm={1} />
          </Grid>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Nearby;