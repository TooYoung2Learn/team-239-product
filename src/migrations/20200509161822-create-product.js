
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    state: {
      type: Sequelize.ENUM('inprogress', 'completed', 'sold'),
      defaultValue: 'inprogress'
    },
    investorId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    farmerId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    associationId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Associations',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Products')
};
