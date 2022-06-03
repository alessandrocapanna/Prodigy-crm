'use strict';
const {
  Model
} = require('sequelize');
const users = require('../models/users');

module.exports = (sequelize, DataTypes) => {
  class Email extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Email.belongsTo(models.Users);
    }
  }
  Email.init({
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        index: true,
        references: {
            Model: users,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    text: DataTypes.STRING,
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Email',
  });
  return Email;
};