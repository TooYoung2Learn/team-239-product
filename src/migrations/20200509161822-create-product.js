
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
    image: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.ENUM('inprogress', 'completed'),
      defaultValue: 'inprogress'
    },
    investorId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    userId: {
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
