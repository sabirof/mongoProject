import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
  // Add more fields as needed
});

const Post = mongoose.model('Post', postSchema);

export default Post;
