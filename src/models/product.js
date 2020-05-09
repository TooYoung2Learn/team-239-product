
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    state: DataTypes.ENUM('inprogress', 'completed'),
    investorId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    associationId: DataTypes.INTEGER
  }, {});
  Product.associate = (models) => {
    // associations can be defined here
    Product.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Product.belongsTo(models.Association, { as: 'association', foreignKey: 'associationId' });
  };
  return Product;
};
