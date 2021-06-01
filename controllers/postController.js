const postService = require('../services/postService');
const { BlogPost, PostsCategory } = require('../models');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;

    const result = await postService.verifyInput(title, content, categoryIds);
    if (result) throw new Error(result);

    // lines from @vanessanaara
    const newPost = await BlogPost.create({ title, content, userId, published: Date() });
    const { id } = newPost;
    await categoryIds.map((categoryId) => PostsCategory
      .create({ postId: id, categoryId }));
    return res.status(201).json({ id, userId, title, content });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { 
  createPost,
};