import express from 'express';
import { createPost, updatePost } from '../controllers/postController.js';
import { apiKeyAuth } from '../middleware/apiKeyAuth.js';


const router = express.Router();
router.post('/', apiKeyAuth(), createPost);
router.put('/:id', apiKeyAuth(), updatePost);


export default router;
