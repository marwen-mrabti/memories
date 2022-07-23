import {
  CREATE_POST,
  DELETE_POST,
  GET_ALL_POSTS,
  GET_POSTS_BY_SEARCH,
  GET_POST_BY_ID,
  LIKE_POST,
  LOADING,
  UPDATE_POST,
} from '../actionTypes/actionTypes';

const initialState = {
  posts: [],
  post: null,
  loading: false,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        loading: false,
      };
    case GET_POSTS_BY_SEARCH:
      return { ...state, posts: action.payload, loading: false };
    case GET_POST_BY_ID:
      return { ...state, post: action.payload, loading: false };
    case LIKE_POST:
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};
