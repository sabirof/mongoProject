import postsModel from "../models/postsModel.js";
import Post from "../models/postsModel.js";



// Function to handle the creation of a new post
const createPostHandler = async (req, res) => {
  const { username, content } = req.body;

  // Check if both username and content are provided
  if (!username || !content) {
    return res.status(400).json({ error: 'Username and Content are required to create a post.' });
  }

  try {
    const newPost = await postsModel.create({ username, content });
    res.json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to create a new post.' });
  }
};


const getAllPostHandler =async (req, res) => {
  try {
    const allpost = await Post.find({})
    res.status(200).json( allpost)
  } catch (error) {
    console.log('error', error)
  }


}

const deletePostHandler = async (req, res) => {
  const postId = req.params.id;
  console.log('postId', postId)


  try {
  
    // console.log('first', postId)
     await Post.deleteOne({_id: postId});
     
    res.json("post deleted")
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to delete the post.' });
  }
};



export  {createPostHandler,getAllPostHandler, deletePostHandler};