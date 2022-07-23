import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import memories from '../../images/memoriesLogo.png';
import memoriesIcon from '../../images/memoriesText.png';

import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles.Navbar.js';
import { UserLogout } from '../../redux/actions/auth.actions';
import { GetAllPosts } from '../../redux/actions/post.actions';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const token = user && user?.token;

  let displayName = '';
  if (user) {
    displayName = user.data.displayName ? user.data.displayName : user.data.name;
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(UserLogout());
      }
    }
  }, [location, token, dispatch]);

  //handlers
  const handleOnLogout = (e) => {
    e.preventDefault();
    dispatch(UserLogout(navigate));
    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link
        to="/"
        className={classes.brandContainer}
        onClick={() => dispatch(GetAllPosts())}
      >
        <img src={memoriesIcon} alt="memories" height="45px" />
        <img className={classes.image} src={memories} alt="memories" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={displayName} src={user.data.photoURL}>
              {displayName.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {displayName}
            </Typography>
            <Button
              className={classes.logout}
              color="secondary"
              variant="contained"
              onClick={handleOnLogout}
            >
              logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" color="primary" variant="contained">
            sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
