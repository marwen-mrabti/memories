import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import useStyles from './styles.PostDetails';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';

const PostDetails = () => {
  const classes = useStyles();

  const { post, loading } = useSelector((state) => state.posts);

  if (!post) return null;

  return loading ? (
    <Paper className={classes.loadingPaper}>
      <CircularProgress size="7rem" />
    </Paper>
  ) : (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post.tags.map((tag, index) => (
              <Link
                key={index}
                to={`/tags/${tag}`}
                style={{ textDecoration: 'none', color: '#3f51b5' }}
              >
                {` #${tag} `}
              </Link>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">
            Created by:
            <Link
              to={`/creators/${post.name}`}
              style={{ textDecoration: 'none', color: '#3f51b5' }}
            >
              {` ${post.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </div>
      </div>
    </Paper>
  );
};

export default PostDetails;
