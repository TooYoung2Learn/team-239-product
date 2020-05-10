/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      communityId: DataTypes.INTEGER,
      role: DataTypes.ENUM('admin', 'user')
    },
    {}
  );
  User.associate = (models) => {
    // associations can be defined here
    User.belongsTo(models.Community, { as: 'community', foreignKey: 'communityId' });
    User.hasMany(models.Product, { as: 'products', foreignKey: 'farmerId' });
  };

  // Remove the password so that it won't get returned during sign in/sign up
  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };
  return User;
};
