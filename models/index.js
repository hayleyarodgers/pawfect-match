const User = require('./User');
const Pet = require('./Pet');

// Pet belongsTo User
Pet.belongsTo(User);

// User can adopt more than one pet
User.hasMany(Pet);

module.exports = { User, Pet };
