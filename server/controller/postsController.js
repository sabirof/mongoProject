import Post from "../models/postsModel.js";

// Function to handle the creation of a new post
export const createPost = async (req, res) => {
  try {
    // Extract the necessary data from the request body
    const { username, content } = req.body;

    // Create a new post in the database
    const newPost = await Post.create({
      username,
      content
    });

    // Return the newly created post as the response
    res.json(newPost);
  } catch (error) {
    // Handle any errors that occur during the creation process
    console.log(error);
    res.status(500).json({ error: 'Failed to create a new post.' });
  }
};
