const { Category } = require('../models');

const checkCategories = async (categories) => {
  let message = null;
  categories.map(async category => {
    const result = await Category.findOne({ where: { id: category } });
    if (!result) {
      console.log("Entroooooooou")
      message = '"categoryIds not found'
    };
  });
  return message;
}

const verifyInput = async (title, content, categoryIds) => {
  if (!title) return '"title" is required';
  if (!content) return '"content" is required';
  if (!categoryIds) return '"categoryIds" is required';
  const checkResult = await checkCategories(categoryIds);
  console.log("!!!!!!!!!!!!!!!!!!!", checkResult)
  if (checkResult) return checkResult;
  return null;
};

module.exports = {
  verifyInput,
};