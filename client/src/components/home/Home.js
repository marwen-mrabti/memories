import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useStyles from './styles.Home';
import {
  Container,
  Grid,
  Grow,
  Paper,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import Paginate from '../Paginate';
import Form from '../form/Form';
import Posts from '../posts/Posts';
import { useDispatch } from 'react-redux';
import { GetPostsBySearch } from '../../redux/actions/post.actions';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [currentId, setCurrentId] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [tags, setTags] = useState([]);

  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;

  //handlers
  const handleOnSearch = () => {
    if (searchInput.trim() || tags) {
      // dispatch -> fetchSearchedPost
      dispatch(GetPostsBySearch({ searchInput, tags: tags.join(',') }));
      navigate(
        `/posts/search?searchQuery=${searchInput || 'none'}&tags=${tags.join(',')}`
      );
    } else {
      navigate('/');
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //search post when enter key is pressed
      handleOnSearch();
    }
  };

  const handleOnAdd = (tag) => setTags([...tags, tag]);
  const handleOnDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                label="search memories"
                variant="outlined"
                fullWidth
                value={searchInput}
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <ChipInput
                label="search tags"
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleOnAdd}
                onDelete={handleOnDelete}
                variant="outlined"
              />
              <Button
                color="primary"
                variant="contained"
                className={classes.searchButton}
                onClick={handleOnSearch}
              >
                Search
              </Button>
            </AppBar>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
            <Paper  elevation={6} className={classes.pagination}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
