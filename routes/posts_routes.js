import express from 'express';
import { getPost, getPosts, newPost, updatePost, deletePost, likePost, getPostsBySearch, commentPost } from '../controllers/posts_controller.js';
import authMiddleware from '../middleware/auth_middleware.js';


/**
 *  Instancition de route via express.
 * 
 *  Définition des differents routes sur bases les posts :  
 *      - /       : tous les posts
 *      - /search : les posts 
 *      - /:id    : single post determiner par son _id
 * 
 *  Exporte default.
 */


///instance d'une application router via express
const router = express.Router();

///route avec un methode get
router.get('/', getPosts);

///get post by the param search
router.get('/search', getPostsBySearch);

router.get('/:id', getPost)

///methode post
router.post('/', authMiddleware, newPost);

///methode patch comme put
router.patch('/:id', authMiddleware, updatePost);
///methode delete
router.delete('/:id', authMiddleware, deletePost);

///methode patch comme put
router.patch('/:id/likePost', authMiddleware, likePost);

router.post('/:id/comment', authMiddleware, commentPost);

////export router.
export default router;
