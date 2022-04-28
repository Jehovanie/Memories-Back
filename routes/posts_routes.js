import express from 'express';
import { getPost, newPost } from '../controllers/posts_controller.js';

const router = express.Router();


router.get('/', getPost);
router.post('/', newPost);

export default router;