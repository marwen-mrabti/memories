import { AUTH, LOGOUT } from '../actionTypes/actionTypes';

export const authReducer = (state = null, action) => {
  switch (action.type) {
    case AUTH: {
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      return action?.payload;
    }
    case LOGOUT: {
      localStorage.removeItem('profile');
      return { state: null };
    }

    default:
      return state;
  }
};
