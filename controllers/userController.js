const userService = require('../services/userService');
const { User } = require('../models');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const result = await userService.verifyUserInput(displayName, email, password);
    if (result) throw new Error(result);

    await User.create({ displayName, email, password, image });
    const token = await userService.generateToken(email, password);
    return res.status(201).json({ token });
  } catch (error) {
    if (error.message === 'User already registered') {
      return res.status(409).json({ message: error.message });
    }
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const fieldsCheck = await userService.loginFieldsCheck(email, password);
    if (fieldsCheck) throw new Error(fieldsCheck);

    const token = await userService.generateToken(email, password);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { 
  createUser,
  login,
};
