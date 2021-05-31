const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Users',
    // Reference lines below: https://stackoverflow.com/questions/42195348/
    // Tip from @vanessanaara
    indexes: [{ unique: true, fields: ['email'] }],
  });
  User.associate = (models) => {
    User.hasMany(models.BlogPost,
      { foreignKey: 'userId', as: 'blogposts' });
  };
  return User;
}