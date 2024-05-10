import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, CircularProgress, IconButton, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Navbar from '../components/Navbar'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

export default function FavoriteCocktails() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false)
  const [cocktails, setCocktails] = React.useState([])
  const [favorites, setFavorites] = React.useState(() => {
    const savedFavorites = window.localStorage.getItem('favorites');
    return savedFavorites !== null ? JSON.parse(savedFavorites) : [];
  });
  const [open, setOpen] = React.useState(false);

  const handleRemoveFavoriteClick = (id) => {
    const newFavorites = favorites.filter(favId => favId !== id);
    window.localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    setLoading(true)
    async function getCocktails() {
      try {
        const allCocktails = await Promise.all(favorites.map(async (id) => {
          const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
          )
          const data = await response.json()
          return data.drinks[0]
        }))
        setCocktails(allCocktails)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getCocktails()
  }, [favorites])

  if (loading) {
    return <CircularProgress />
  }
  if (!cocktails.length) {
    return <Typography variant="h4" component="h2">No favorite cocktails to display</Typography>
  } else {
    return (
      <>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Cocktail removed from favorites!
          </Alert>
        </Snackbar>
        {cocktails.map((cocktail) => {
          const {
            idDrink: id,
            strDrink: name,
            strDrinkThumb: image,
          } = cocktail
          return (
            <Card className={classes.root} key={id}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {name}
                </Typography>
                <img src={image} alt={name} />
                <Button component={RouterLink} to={`/cocktail/${id}`} variant="contained" color="primary">
                  View Details
                </Button>
                <IconButton onClick={() => handleRemoveFavoriteClick(id)} color="secondary">
                  <FavoriteIcon />
                </IconButton>
              </CardContent>
            </Card>
          )
        })}
      </>
    )
  }
}