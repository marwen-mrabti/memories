import * as api from '../api/api.index';
import { AUTH, LOGOUT } from '../actionTypes/actionTypes';

//user sign up
export const UserSignUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, payload: { data: data.newUser, token: data.token } });
    //navigate to home page
    setTimeout(() => {
      navigate('/');
    }, 250);
  } catch (error) {
    console.log(error.message);
  }
};

//user sign in
export const UserSignIn = (formData, navigate) => async (dispatch) => {
  try {
    //login user
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, payload: { data: data.userData, token: data.token } });
    //navigate to home page
    setTimeout(() => {
      navigate('/');
    }, 250);
  } catch (error) {
    console.log(error.message);
  }
};

//google login
export const UserAuth = (user, token, navigate) => async (dispatch) => {
  try {
    dispatch({ type: AUTH, payload: { data: user, token } });
    setTimeout(() => {
      navigate('/');
    }, 250);
  } catch (error) {
    console.log(error.message);
  }
};

//logout
export const UserLogout = (navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
    setTimeout(() => {
      navigate('/auth');
    }, 100);
  } catch (error) {
    console.log(error.message);
  }
};
