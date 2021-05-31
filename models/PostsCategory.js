const PostsCategory = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', {},
  {timestamps: false});
  PostsCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'categoryId',
      as: 'categories',
      through: PostsCategory,
      otherKey: 'postId'
    });
    models.BlogPost.belongsTo(models.Category, {
      foreignKey: 'postId',
      as: 'blogposts',
      through: PostsCategory,
      otherKey: 'categoryId'
    })
  };
  return PostsCategory;
}