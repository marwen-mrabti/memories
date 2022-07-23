//load post model
import { Post } from '../models/post.model.js';

//get all posts
export const GetAllPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Post.countDocuments({});

    const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get posts by search
export const GetAllPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i');
    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get post by id
export const GetPostById = async (req, res) => {
  const { post_id } = req.params;

  try {
    const post = await Post.findById(post_id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//create new post
export const CreatePost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = new Post({
      ...post,
      tags: post.tags.split(','),
      name: post.name,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//edit post
export const UpdatePost = async (req, res) => {
  try {
    const id = req.params.post_id;
    const post = req.body;
    const updatedPost = await Post.findByIdAndUpdate(id, { ...post, id }, { new: true });
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//delete post
export const DeletePost = async (req, res) => {
  try {
    const id = req.params.post_id;
    await Post.findByIdAndRemove(id);
    res.status(201).json({ message: 'post deleted' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//like post
export const LikePost = async (req, res) => {
  try {
    if (!req.userId) {
      return res.json({ message: 'unauthenticated' });
    }

    const id = req.params.post_id;
    const post = await Post.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      //like post
      post.likes.push(req.userId);
    } else {
      //remove like
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
