import express from 'express';
const PostRouter = express.Router();
//middleware
import { auth } from '../middleware/auth.middleware.js';
//load handlers
import {
  CreatePost,
  DeletePost,
  GetAllPosts,
  GetAllPostsBySearch,
  GetPostById,
  LikePost,
  UpdatePost,
} from '../controllers/post.controllers.js';

//get all posts => get ==> /api/posts/all
PostRouter.get('/all', GetAllPosts);
//get post by id => get ==> /api/posts/:post_id
PostRouter.get('/:post_id', GetPostById);
//get all posts => get ==> /api/posts/search
PostRouter.get(`/search`, GetAllPostsBySearch);

//create post => post ==> /api/posts/new
PostRouter.post('/new', auth, CreatePost);
//edit post => put ==> /api/posts/edit/:post_id
PostRouter.put('/edit/:post_id', auth, UpdatePost);

//edit post => delete ==> /api/posts/delete/:post_id
PostRouter.delete('/delete/:post_id', auth, DeletePost);
//like post => put ==> /api/posts/like/:post_id
PostRouter.put('/like/:post_id', auth, LikePost);

//export router
export default PostRouter;
