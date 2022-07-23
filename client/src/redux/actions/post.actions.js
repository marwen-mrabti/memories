import * as api from '../api/api.index.js';
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

//fetch all posts
export const GetAllPosts = (page) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await api.fetchPosts(page);
    dispatch({ type: GET_ALL_POSTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

//get posts by search
export const GetPostsBySearch = (searchQuery) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: GET_POSTS_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

//get post by id
export const GetPostById = (post_id) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await api.fetchPostById(post_id);
    dispatch({ type: GET_POST_BY_ID, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

//create new post
export const CreatePost = (newPost) => async (dispatch) => {
  try {
    const res = await api.createPost(newPost);
    dispatch({ type: CREATE_POST, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

//update post
export const UpdatePost = (post_id, post) => async (dispatch) => {
  try {
    const res = await api.updatePost(post_id, post);
    dispatch({ type: UPDATE_POST, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

//like post
export const LikePost = (post_id) => async (dispatch) => {
  try {
    const res = await api.likePost(post_id);
    dispatch({ type: LIKE_POST, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

//delete post
export const DeletePost = (post_id) => async (dispatch) => {
  try {
    await api.deletePost(post_id);
    dispatch({ type: DELETE_POST, payload: post_id });
  } catch (error) {
    console.log(error);
  }
};
