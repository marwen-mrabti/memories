import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: { type: String },
  message: { type: String },
  creator: { type: String },
  name: { type: String },
  tags: [{ type: String }],
  selectedFile: { type: String },
  likes: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() },
});

export const Post = mongoose.model('posts', PostSchema);
