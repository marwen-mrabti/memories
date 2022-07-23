import React from 'react';
import { useSelector } from 'react-redux';

import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles.posts';
import Post from './post/Post';
const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, loading } = useSelector((state) => state.posts);

  return loading ? (
    <div className={classes.spinnerContainer}>
      <CircularProgress size="7rem" />
    </div>
  ) : !posts.length ? (
    <div className={classes.spinnerContainer}>
      <h1 style={{ color: 'orange' }}>no posts</h1>
      <h2 style={{ color: 'blue' }}>Create one </h2>
    </div>
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
