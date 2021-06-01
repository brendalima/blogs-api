const { Category } = require('../models');

const checkCategories = async (categories) => {
  const allCategories = await Category.findAll({});
  // tip bellow from Luíse
  const check = categories.every(item => allCategories
    .some(category => category.id === item));
  return check;
}

const verifyInput = async (title, content, categoryIds) => {
  if (!title) return '"title" is required';
  if (!content) return '"content" is required';
  if (!categoryIds) return '"categoryIds" is required';
  const checkResult = await checkCategories(categoryIds);
  if (!checkResult) return '"categoryIds" not found';
  return null;
};

module.exports = {
  verifyInput,
};