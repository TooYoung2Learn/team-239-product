module.exports = (sequelize, DataTypes) => {
  const Community = sequelize.define('Community', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {});
  Community.associate = (models) => {
    // associations can be defined here
    Community.hasMany(models.User, { as: 'users', foreignKey: 'communityId' });
  };
  return Community;
};
