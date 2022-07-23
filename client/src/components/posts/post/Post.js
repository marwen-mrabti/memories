import React from 'react';
import moment from 'moment';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from './styles.post';
import { useDispatch } from 'react-redux';
import { DeletePost, GetPostById, LikePost } from '../../../redux/actions/post.actions';
import { Link } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const classes = useStyles();
  const dispatch = useDispatch();
  //handlers
  const handleOnEdit = (e) => {
    e.preventDefault();
    setCurrentId(post._id);
  };

  const handleOnDelete = (e) => {
    e.preventDefault();
    dispatch(DeletePost(post._id));
  };

  const handleOnLike = (e) => {
    e.preventDefault();
    dispatch(LikePost(post._id));
  };

  return (
    <Card className={`card-hover ${classes.card}`} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
        component={Link}
        to={`/posts/:${post._id}`}
        onClick={() => dispatch(GetPostById(post._id))}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="h6">{moment(post.createdAt).fromNow()} </Typography>
      </div>
      {user && (user.data._id || user.data.uid) === post.creator && (
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small" onClick={handleOnEdit}>
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      {user && (
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={handleOnLike}>
            <ThumbUpAltIcon fontSize="small" /> &nbsp;{post.likes.length}&nbsp;
            {post.likes.length === 1 ? 'like' : 'likes'}
          </Button>
          {(user.data._id || user.data.uid) === post.creator && (
            <Button size="small" color="secondary" onClick={handleOnDelete}>
              <DeleteIcon fontSize="small" />
              delete
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default Post;
