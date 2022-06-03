import express from 'express';
import { getPost, newPost, updatePost, deletePost, likePost, getPostsBySearch } from '../controllers/posts_controller.js';

import authMiddleware from '../middleware/auth_middleware.js';


///instance d'une application router via express
const router = express.Router();


///route avec un methode get
router.get('/', getPost);

///get post by the param search
router.get('/search', getPostsBySearch);

///methode post
router.post('/', authMiddleware, newPost);

///methode patch comme put
router.patch('/:id', authMiddleware, updatePost);

///methode delete
router.delete('/:id', authMiddleware, deletePost);

///methode patch comme put
router.patch('/:id/likePost', authMiddleware, likePost);

////export router.
export default router;
