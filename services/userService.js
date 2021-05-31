const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const requiredField = (field) => {
  if (field === undefined || field === null) return null;
  return true;
};

// function from https://ui.dev/validate-email-address-javascript/
const emailIsValid = (email) => {
  if (/\S+@\S+\.\S+/.test(email)) {
    return true;
  } 
    return false;
};

const lengthIsValid = (displayName, password) => {
  const NAME_MIN_LENGTH = 8;
  const PASSWORD_MIN_LENGTH = 6;
  if (displayName.length < NAME_MIN_LENGTH) {
    return '"displayName" length must be at least 8 characters long'; // 400
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return '"password" length must be 6 characters long'; // 400
  }
  return null;
};

const validateUser = (email, password) => {
  if (!requiredField(email)) return '"email" is required'; // 400
  if (!requiredField(password)) return '"password" is required'; // 400
  if (!emailIsValid(email)) return '"email" must be a valid email'; // 400
  return null;
};

const emailExists = async (email) => {
  const emailCheck = await User.findOne({ where: { email } });
  if (emailCheck) {
    return 'User already registered'; // 409
  }
  return null;
};

const verifyUserInput = async (displayName, email, password) => {
  const userIsValidated = validateUser(email, password);
  if (userIsValidated) return userIsValidated;
  const existingEmail = await emailExists(email);
  if (existingEmail) return existingEmail;
  if (lengthIsValid(displayName, password)) {
    return lengthIsValid(displayName, password);
  }
  return null;
};

const generateToken = (email, password) => {
  const token = jwt.sign({ email, password }, JWT_SECRET);
  return token;
};

module.exports = {
  verifyUserInput,
  generateToken,
};
