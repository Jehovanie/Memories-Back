import express from 'express';
import { getPost, newPost, updatePost, deletePost } from '../controllers/posts_controller.js';

const router = express.Router();


router.get('/', getPost);
router.post('/', newPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;