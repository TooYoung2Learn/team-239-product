
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Associations',
    [
      {
        name: 'association seed 1',
        chairman: 'Seed 1 chairman',
        description: 'description for seed 1',
        image: 'https://images.com/seed1.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'association seed 2',
        chairman: 'Seed 2 chairman',
        description: 'description for seed 2',
        image: 'https://images.com/seed2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'association seed 3',
        chairman: 'Seed 3 chairman',
        description: 'description for seed 3',
        image: 'https://images.com/seed3.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Associations', null, {})
};
