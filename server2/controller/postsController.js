import Post from "../models/postsModel.js";

// Function to handle the creation of a new post
const createPost = async (req, res) => {
  const { username, content } = req.body;

  // Check if both username and content are provided
  if (!username || !content) {
    return res.status(400).json({ error: 'Username and Content are required to create a post.' });
  }

  try {
    const newPost = await Post.create({ username, content });
    res.json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to create a new post.' });
  }
};