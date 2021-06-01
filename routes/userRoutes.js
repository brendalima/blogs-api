const express = require('express');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
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
  .post(validateJWT, categoryController.createCategory);

module.exports = router;