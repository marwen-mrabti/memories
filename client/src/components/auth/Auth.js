import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { UserAuth, UserSignIn, UserSignUp } from '../../redux/actions/auth.actions';
//firebase auth
import { auth } from './Firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

//styles
import './googleBtn.css';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles.Auth';
import { Input } from './Input';

const Auth = () => {
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //handlers
  const handleOnGoogleSignIn = async (e) => {
    e.preventDefault();
    const { user } = await signInWithPopup(auth, provider);
    const token = user?.accessToken;
    try {
      dispatch(UserAuth(user, token, navigate));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    isSignup
      ? dispatch(UserSignUp(formData, navigate))
      : dispatch(UserSignIn(formData, navigate));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = (e) => {
    setShowPassword((prev) => !prev);
  };

  const switchMode = (e) => {
    e.preventDefault();
    setIsSignup((prev) => !prev);
    handleShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon />
        </Avatar>
        <Typography variant="h5"> {isSignup ? 'sign up' : 'sign in'} </Typography>
        <form className={classes.form} onSubmit={handleOnSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="email address"
              value={formData.email}
              type="email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="password"
              value={formData.password}
              type={!showPassword ? 'password' : 'text'}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat password"
                value={formData.confirmPassword}
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <button className="login-with-google-btn" onClick={handleOnGoogleSignIn}>
                sign in with google
              </button>
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? sign in'
                  : 'you do not have an account? sign up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
