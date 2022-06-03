'use strict';
const {
  Model
} = require('sequelize');
const users = require('../models/users');
const offers = require('../models/offers');

module.exports = (sequelize, DataTypes) => {
  class User_Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_Offer.belongsTo(models.Users);
      User_Offer.belongsTo(models.Offers);
    }
  }
  User_Offer.init({
    UserId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      index: true,
      references: {
          Model: users,
          key: 'id'
      },
      onDelete: 'CASCADE'
  },
    OfferId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      index: true,
      references: {
          Model: offers,
          key: 'id'
      },
      onDelete: 'CASCADE'
  }
  }, {
    sequelize,
    modelName: 'User_Offer',
  });
  return User_Offer;
};