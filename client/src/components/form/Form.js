import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { Button, Paper, TextField, Typography } from '@material-ui/core';
import useStyles from './styles.form';

import { CreatePost, GetAllPosts, UpdatePost } from '../../redux/actions/post.actions';
const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const user = JSON.parse(localStorage.getItem('profile'));
  let displayName = 'placeholder';
  if (user) {
    displayName = user.data.displayName ? user.data.displayName : user.data.name;
  }
  const { posts } = useSelector((state) => state.posts);
  const post = currentId ? posts.find((post) => post._id === currentId) : null;
  useEffect(() => {
    post && setPostData(post);
  }, [post]);

  //handlers
  const handleOnSubmit = (e) => {
    e.preventDefault();

    currentId
      ? dispatch(
          UpdatePost(currentId, {
            ...postData,
            name: displayName,
          })
        ) &&
        dispatch(GetAllPosts()) &&
        handleOnClear()
      : postData.title && postData.message && postData.tags && postData.selectedFile
      ? dispatch(CreatePost({ ...postData, name: displayName })) && handleOnClear()
      : alert('all fields are required');
  };

  const handleOnClear = () => {
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
    setCurrentId(null);
  };

  if (!user?.data) {
    return (
      <Paper className={`${classes.paper}`}>
        <Typography variant="h6" align="center">
          please sign in to create your own memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={`${classes.paper} ${classes.root}`}  elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleOnSubmit}
      >
        <Typography variant="h6">
          {currentId ? `updating` : `creating`} a memory
        </Typography>

        <TextField
          required
          name="title"
          label="title"
          variant="outlined"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          required
          name="message"
          label="message"
          variant="outlined"
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          required
          helperText="comma separated values"
          name="tags"
          label="tags"
          variant="outlined"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          className={classes.buttonSubmit}
        >
          share memory
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={handleOnClear}
        >
          clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
