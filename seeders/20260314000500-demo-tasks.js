'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Beach Cleanup Drive',
        description: 'Collect plastic waste along the coastline and sort recyclables.',
        reward: 50,
        requiredVolunteers: 20,
        completed: false,
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Community Tree Planting',
        description: 'Plant and water new saplings in the community park.',
        reward: 75,
        requiredVolunteers: 15,
        completed: false,
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Food Distribution',
        description: 'Pack and distribute meals to local shelters.',
        reward: 100,
        requiredVolunteers: 10,
        completed: false,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};

