'use strict';
const {
  Model
} = require('sequelize');
const users = require('../models/users');
module.exports = (sequelize, DataTypes) => {
  class Quotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Quotes.belongsTo(models.Users);
    }
  }
  Quotes.init({
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
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Quotes',
    tableName: 'Quotes',
  });
  return Quotes;
};