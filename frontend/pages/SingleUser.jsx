import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, List, ListItem, Divider } from '@material-ui/core';
import Navbar from '../components/Navbar';

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

function SingleUser() {
    const classes = useStyles();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5001/user/5')
        .then(response => response.json())
        .then(data => {
            setUser(data);
            setPosts(data.posts);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {user.first_name} {user.last_name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {user.email}
                </Typography>
                <Typography variant="body2" component="p">
                    Posts:
                </Typography>
                <List>
                    {posts.map((post, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                <Typography variant="h5" component="h2">
                                    {post.title}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography className={classes.pos} color="textSecondary">
                                    {post.body}
                                </Typography>
                            </ListItem>
                            {index !== posts.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </CardContent>
        </Card>
        </>
    );
}

export default SingleUser;