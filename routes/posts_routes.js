import express from 'express';
import { getPost, newPost, updatePost, deletePost, likePost } from '../controllers/posts_controller.js';


///instance d'une application router via express
const router = express.Router();


///route avec un methode get
router.get('/', getPost);

///methode post
router.post('/', newPost);

///methode patch comme put
router.patch('/:id', updatePost);

///methode delete
router.delete('/:id', deletePost);

///methode patch comme put
router.patch('/:id/likePost', likePost);

////export router.
export default router;
