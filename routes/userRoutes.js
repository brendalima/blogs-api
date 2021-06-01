const express = require('express');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const postController = require('../controllers/postController');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router
  .route('/user')
  .post(userController.createUser)
  .get(validateJWT, userController.getAllUsers);

router
  .route('/user/:id')
  .get(validateJWT, userController.getUser);

router.post('/login', userController.login);

router
  .route('/categories')
  .post(validateJWT, categoryController.createCategory)
  .get(validateJWT, categoryController.getAllCategories);

router
  .route('/post')
  .post(validateJWT, postController.createPost)
  .get(validateJWT, postController.getAllPosts);

module.exports = router;