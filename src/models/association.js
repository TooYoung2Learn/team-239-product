module.exports = (sequelize, DataTypes) => {
  const Association = sequelize.define(
    'Association',
    {
      name: DataTypes.STRING,
      chairman: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      communityId: DataTypes.INTEGER
    },
    {}
  );
  Association.associate = (models) => {
    // associations can be defined here
    Association.hasMany(models.User, { as: 'users', foreignKey: 'associationId' });
    Association.belongsTo(models.Community, { as: 'community', foreignKey: 'communityId' });
    Association.hasMany(models.Product, { as: 'products', foreignKey: 'associationId' });
  };
  return Association;
};
