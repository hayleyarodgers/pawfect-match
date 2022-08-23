const User = require('./User');
const Pet = require('./Pet');
const Comment = require('./Comment')

// User can adopt more than one pet
User.hasMany(Pet, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

// Pet belongsTo User
Pet.belongsTo(User, {
    foreignKey: 'user_id',
  });

Pet.hasMany(Comment, {
    foreignKey: 'pet_id',
    onDelete: 'CASCADE'
  });

Comment.belongsTo(Pet,{
    foreignKey: 'pet_id',
  })

module.exports = { User, Pet, Comment};
