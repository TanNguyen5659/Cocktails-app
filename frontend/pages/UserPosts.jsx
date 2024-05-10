import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Container, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  container: {
    marginTop: 20,
  },
  card: {
    marginBottom: 20,
    padding: '20px',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    marginTop: 10,
    fontSize: 16,
  },
});

function UserPosts() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user')).id;

    const url = `http://127.0.0.1:5001/user/${userId}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
        setUser(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const deletePost = (postId) => {
    const url = `http://127.0.0.1:5001/post/${postId}`;
    console.log(url);

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(() => {
        setPosts(posts.filter(post => post.id !== postId));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const editEmail = () => {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const username = 'Minh8';
    const password = 'Minhtan8';

    const url = `http://127.0.0.1:5001/user/${userId}`;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ username, password, email: newEmail })
    })
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setOpen(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  return (
    <Container className={classes.container} maxWidth="md">
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            User Info
          </Typography>
          <Typography variant="body1" component="p">
            Name: {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="body1" component="p">
            Email: {user.email}
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              style={{ marginLeft: '10px' }}
            >
              Edit Email
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Change Email</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter your new email address.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  onChange={handleEmailChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={editEmail} color="primary">
                  Change Email
                </Button>
              </DialogActions>
            </Dialog>
          </Typography>
          <Typography variant="body1" component="p">
            Username: {user.username}
          </Typography>
        </CardContent>
      </Card>
      <Typography variant="h5" component="h2" gutterBottom>
        User Posts
      </Typography>
      {posts.map((post, index) => (
        <Card className={classes.card} key={index}>
          <CardContent>
            <Typography className={classes.title} variant="h6" component="h2">
              {post.title}
            </Typography>
            <Typography className={classes.body} variant="body2" component="p">
              {post.body}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => deletePost(post.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default UserPosts;