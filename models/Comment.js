const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		user: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		users_comment: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		pet_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Pet',
				key: 'id',
				unique: false,
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'comment',
	}
);

module.exports = Comment;
