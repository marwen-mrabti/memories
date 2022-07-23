import axios from 'axios';
//url
const apiUrl = 'http://localhost:5000';


//create axios api
const API = axios.create({ baseURL: apiUrl });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }

  return req;
});

export const signIn = (formData) => API.post(`/api/auth/login`, formData);
export const signUp = (formData) => API.post(`/api/auth/register`, formData);

export const fetchPosts = (page) => API.get(`/api/posts/all?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/api/posts/search?searchQuery=${searchQuery.searchInput || 'none'}&tags=${
      searchQuery.tags
    }`
  );
export const fetchPostById = (post_id) => API.get(`/api/posts/${post_id}`);

export const createPost = (newPost) => API.post('/api/posts/new', newPost);
export const updatePost = (id, updatedPost) =>
  API.put(`/api/posts/edit/${id}`, updatedPost);
export const likePost = (id) => API.put(`/api/posts/like/${id}`);

export const deletePost = (id) => API.delete(`/api/posts/delete/${id}`);
