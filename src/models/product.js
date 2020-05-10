
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    images: DataTypes.ARRAY(DataTypes.STRING),
    state: DataTypes.ENUM('inprogress', 'completed', 'sold'),
    investorId: DataTypes.INTEGER,
    farmerId: DataTypes.INTEGER,
    associationId: DataTypes.INTEGER
  }, {});
  Product.associate = (models) => {
    // associations can be defined here
    Product.belongsTo(models.User, { as: 'user', foreignKey: 'farmerId' });
    Product.belongsTo(models.Association, { as: 'association', foreignKey: 'associationId' });
  };
  return Product;
};
