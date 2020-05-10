module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Products',
    [
      {
        name: 'Product seed 1',
        description: 'description for seed 1',
        images: ['https://images.com/seed1.png'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product seed 2',
        description: 'description for seed 2',
        images: ['https://images.com/seed2.png'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product seed 3',
        description: 'description for seed 3',
        images: ['https://images.com/seed3.png'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Associations', null, {})
};
