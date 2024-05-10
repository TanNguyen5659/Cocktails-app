import React, { useEffect, useState } from 'react';
import { Button, Container, TextField, Typography, Card, CardContent, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Navbar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0.5), 
    backgroundColor: '#F2F2F7',
    overflow: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: theme.spacing(0.25),
    padding: theme.spacing(0.5), 
    marginBottom: theme.spacing(0.5), 
  },
  textField: {
    marginBottom: theme.spacing(0.5), 
    width: '80%',
  },
  button: {
    alignSelf: 'flex-end',
  },
  card: {
    marginBottom: theme.spacing(0.5), 
    backgroundColor: 'white',
    borderRadius: theme.spacing(0.25), 
  },
  replyCard: {
    marginTop: theme.spacing(0.5), 
    marginBottom: theme.spacing(0.5), 
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(0.5), 
  },
  replyText: {
    marginBottom: theme.spacing(0.5), 
  },
}));

function CarPage() {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [reactions, setReactions] = useState({});
  const [replies, setReplies] = useState({});

  useEffect(() => {
    const storedReactions = localStorage.getItem('reactions');
    if (storedReactions) {
      setReactions(JSON.parse(storedReactions));
    }

    const storedReplies = localStorage.getItem('replies');
    if (storedReplies) {
      setReplies(JSON.parse(storedReplies));
    }

    fetch('http://127.0.0.1:5001/post/')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  const addCarRecommendation = (event) => {
    event.preventDefault();

    const newPost = {
      user_id: 17, // hardcoded user_id
      title: title,
      body: body
    };

    fetch('http://127.0.0.1:5001/post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then(response => response.json())
      .then(data => setPosts(prevPosts => [...prevPosts, data]));

    setTitle('');
    setBody('');
  };

  const deleteCarRecommendation = (postId) => {
    fetch(`http://127.0.0.1:5001/post/${postId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPosts(posts.filter(post => post.id !== postId));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleReaction = (postId, type) => {
    setReactions(prevReactions => {
      const updatedReactions = {
        ...prevReactions,
        [postId]: {
          ...prevReactions[postId],
          [type]: (prevReactions[postId]?.[type] || 0) + 1,
        },
      };
      localStorage.setItem('reactions', JSON.stringify(updatedReactions));
      return updatedReactions;
    });
  };

  const addDiscussion = (postId, text) => {
    const replyId = uuidv4();
    setReplies(prevReplies => {
      const updatedReplies = {
        ...prevReplies,
        [postId]: [
          ...(prevReplies[postId] || []),
          { replyId, text },
        ],
      };
      localStorage.setItem('replies', JSON.stringify(updatedReplies));
      return updatedReplies;
    });
  };

  return (
    <>
      <Container className={classes.container} maxWidth="sm">
        <Typography variant="h6" gutterBottom>Cocktail Recommendations</Typography>
        {[...posts].reverse().map(post => (
          <Card key={post.id} className={classes.card}>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2">{post.body}</Typography>
              <Typography variant="body2">Author: {post.author.first_name} {post.author.last_name}</Typography>
              <IconButton color="primary" onClick={() => handleReaction(post.id, 'like')}>
                <ThumbUpIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleReaction(post.id, 'dislike')}>
                <ThumbDownIcon />
              </IconButton>
              <Typography variant="body2">Likes: {reactions[post.id]?.like || 0}</Typography>
              <Typography variant="body2">Dislikes: {reactions[post.id]?.dislike || 0}</Typography>
            </CardContent>
            <form onSubmit={(e) => { e.preventDefault(); addDiscussion(post.id, e.target.elements.replyText.value); e.target.reset(); }}>
              <TextField name="replyText" label="Reply" fullWidth variant="outlined" className={classes.replyText} />
              <Button variant="contained" color="primary" type="submit" className={classes.button}>Reply</Button>
            </form>
            {replies[post.id]?.map(reply => (
              <Card className={classes.replyCard} key={reply.replyId}>
                <CardContent>
                  <Typography variant="body2">{reply.text}</Typography>
                </CardContent>
              </Card>
            ))}
          </Card>
        ))}
        <Typography variant="h6" gutterBottom>Recommend a new cocktail</Typography>
        <form onSubmit={addCarRecommendation} className={classes.form}>
          <TextField
            label="Cocktail name"
            fullWidth
            variant="outlined"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={classes.textField}
          />
          <TextField
            label="Why do you recommend it?"
            fullWidth
            variant="outlined"
            value={body}
            onChange={e => setBody(e.target.value)}
            className={classes.textField}
            multiline
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
}

export default CarPage;