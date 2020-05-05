
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Communities',
    [
      {
        name: 'community seed 1',
        description: 'description for seed 1',
        image: 'http://image.com/seed1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'community seed 2',
        description: 'description for seed 2',
        image: 'http://image.com/seed2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'community seed 3',
        description: 'description for seed 3',
        image: 'http://image.com/seed3.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'community seed 4',
        description: 'description for seed 4',
        image: 'http://image.com/seed4.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'community seed 5',
        description: 'description for seed 5',
        image: 'http://image.com/seed5.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Communities', null, {})
};
