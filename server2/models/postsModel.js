import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  }
  
});

const postsModel = mongoose.model('post', postSchema);

export default postsModel;
