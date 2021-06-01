// const categoryService = require('../services/categoryService');
const { Category } = require('../models');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) throw new Error('"name" is required');

    const { id, name: catName } = await Category.create({ name });
    return res.status(201).json({ id, name: catName });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const results = await Category.findAll({});
    
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  createCategory,
  getAllCategories,
};
