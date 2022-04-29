import express from 'express';
import { getPost, newPost, updatePost } from '../controllers/posts_controller.js';

const router = express.Router();


router.get('/', getPost);
router.post('/', newPost);
router.patch('/:id', updatePost);

export default router;