const User = require('./User');
const Pet = require('./Pet');
const Comment = require('./Comment')

User.hasMany(Pet, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Pet.belongsTo(User, {
    foreignKey: 'user_id',
});

Pet.hasMany(Comment, {
    foreignKey: 'pet_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Pet, {
    foreignKey: 'pet_id',
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
})

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

module.exports = { User, Pet, Comment };
