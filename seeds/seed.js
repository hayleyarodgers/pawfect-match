const sequelize = require('../config/connection');
const { User, Cat, Dog } = require('../models');

const userData = require('./userData.json');
const dogData = require('./projectData.json');
const catData = require('./catData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // for (const project of projectData) {
  //   await Project.create({
  //     ...project,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // } 
  
  // Use the above commented code to create cat and dog seeds

  process.exit(0);
};

seedDatabase();
