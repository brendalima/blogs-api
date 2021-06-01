module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', {},
  { timestamps: false });
  PostsCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'categoryId',
      as: 'blogposts',
      through: PostsCategory,
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId',
      as: 'categories',
      through: PostsCategory,
      otherKey: 'categoryId',
    });
  };
  return PostsCategory;
};
