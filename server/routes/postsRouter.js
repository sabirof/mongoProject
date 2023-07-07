// postsRouter.js

const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// Route for creating a new post
router.post('/new', postsController.createPost);

module.exports = router;
