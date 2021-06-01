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

const getAllUsers = async (req, res) => {
  try {
    // following line from @vanessanaara
    const results = await User.findAll({ attributes: { exclude: ['password'] } });
    
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    // following line from @vanessanaara
    const results = await User.findByPk(id, {
      attributes: { exclude: ['password'] }, 
    });
    if (!results) throw new Error('User does not exist');
    
    return res.status(200).json(results);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = { 
  createUser,
  login,
  getAllUsers,
  getUser,
};
