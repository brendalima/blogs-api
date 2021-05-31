module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
    tableName: 'BlogPosts',
  });
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.BlogPost,
      { foreignKey: 'userId', as: 'users' });
  };
  return BlogPost;
};