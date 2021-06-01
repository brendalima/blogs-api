const postService = require('../services/postService');
const { BlogPost, PostsCategory, User, Category } = require('../models');

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

const getAllPosts = async (req, res) => {
  try {
    const { id } = req.user;
    const allPosts = await BlogPost.findAll({
      // Tip from @vanessanaara
      where: { userId: id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  createPost,
  getAllPosts,
};