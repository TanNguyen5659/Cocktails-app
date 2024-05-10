import React from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, List, ListItem, CircularProgress, IconButton } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Navbar from '../components/Navbar'
import YouTube from 'react-youtube';

const useStyles = makeStyles({
    root: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: 20,
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SingleCocktail() {
  const classes = useStyles();
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [cocktail, setCocktail] = React.useState(null)
  const [videoId, setVideoId] = React.useState(null);
  const [allRatings, setAllRatings] = React.useState(() => {
    const savedRatings = window.localStorage.getItem(`ratings-${id}`);
    return savedRatings !== null ? JSON.parse(savedRatings) : [];
  });
  const [rating, setRating] = React.useState(0);
  const [favorite, setFavorite] = React.useState(() => {
    const savedFavorites = window.localStorage.getItem('favorites');
    return savedFavorites !== null ? JSON.parse(savedFavorites) : [];
  });

  React.useEffect(() => {
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

  const handleFavoriteClick = () => {
    let newFavorites;
    if (favorite.includes(id)) {
      newFavorites = favorite.filter(favId => favId !== id);
    } else {
      newFavorites = [...favorite, id];
    }
    window.localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorite(newFavorites);
  };

  React.useEffect(() => {
    setLoading(true)
    async function getCocktail() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        )
        const data = await response.json()
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0]
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ]
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          }
          setCocktail(newCocktail)
        } else {
          setCocktail(null)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getCocktail()
  }, [id])

  React.useEffect(() => {
    if (cocktail) {
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${cocktail.name}+cocktails&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.items.length > 0) {
            setVideoId(data.items[0].id.videoId);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [cocktail]);

  if (loading) {
    return <CircularProgress />
  }
  if (!cocktail) {
    return <Typography variant="h4" component="h2">No cocktail to display</Typography>
  } else {
    const {
      name,
      image,
      category,
      info,
      glass,
      instructions,
      ingredients,
    } = cocktail
    return (
        <>
          <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {name}
                </Typography>
                <img src={image} alt={name} />
                <Rating
                  name="star-rating"
                  value={rating}
                  onChange={handleRatingChange}
                />
                <Typography variant="body2" component="p">
                  Average Rating: {rating.toFixed(1)}
                </Typography>
                <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                  <FavoriteIcon color={favorite.includes(id) ? 'secondary' : 'action'} />
                </IconButton>
                {videoId && (
                  <YouTube videoId={videoId} opts={{ height: '390', width: '640' }} />
                )}
                <List>
                    <ListItem>
                        <Typography variant="body1" component="p">
                            <strong>Category:</strong> {category}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" component="p">
                            <strong>Info:</strong> {info}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" component="p">
                            <strong>Glass:</strong> {glass}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" component="p">
                            <strong>Instructions:</strong> {instructions}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" component="p">
                            <strong>Ingredients:</strong> 
                            {ingredients.map((item, index) => {
                                return item ? <span key={index}> {item}</span> : null
                            })}
                        </Typography>
                    </ListItem>
                </List>
                <Button component={RouterLink} to='/home' variant="contained" color="primary">
                    Back Home
                </Button>
            </CardContent>
          </Card>
        </>
      )
  }
}