const express = require('express');
const userController = require('../controllers/userController');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router
  .route('/user')
  .post(userController.createUser)
  .get(validateJWT, userController.getAllUsers);
  // .put(validateJWT, userController.editUser);

router.post('/login', userController.login);
// router.post('/users/admin', validateJWT, validateAdmin, usersController.createAdmin); 

module.exports = router;