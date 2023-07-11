import express from 'express';
const router = express.Router();

import { createPost } from '../controllers/postsController.js';
import jwtAuth from '../middleware/jwtAuth.js';

// Route for creating a new post
router.post('/create', jwtAuth, createPost);

export default router;