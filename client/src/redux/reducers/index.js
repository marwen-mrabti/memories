import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { postReducer } from './post.reducer';

const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
});

export default rootReducer;
