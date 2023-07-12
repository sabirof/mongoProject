import express from 'express';
const router = express.Router();
// 
// import { createPost } from '../controllers/postsController.js';
import jwtAuth from '../middleware/jwtAuth.js';
import  { createPostHandler, deletePostHandler, getAllPostHandler } from '../controller/postsController.js';


// Route for creating a new post
router.post('/create',jwtAuth, createPostHandler);
  router.delete('/delete/:id',
  deletePostHandler);
  router.get('/getall', getAllPostHandler)

export default router;