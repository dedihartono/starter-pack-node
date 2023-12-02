import express from 'express';
import * as userController from '../controllers/userController';
import * as postController from '../controllers/postController';
import * as categoryController from '../controllers/categoryController';

const router = express.Router();

// Users
router.get('/v1/users', userController.getAllUsers);
router.post('/v1/users', userController.createUser);

// Posts
router.get('/v1/posts', postController.getAllPosts);
router.post('/v1/posts', postController.createPost);

// Categories
router.get('/v1/categories', categoryController.getAllcategories);
router.post('/v1/categories', categoryController.createCategory);


export default router;