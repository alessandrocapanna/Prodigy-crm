'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Quotes);
      Users.hasMany(models.Email);
      Users.belongsToMany(models.Offers, {through: models.User_Offer});
    }
  }
  Users.init({
    
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image_path: DataTypes.STRING,
    document_path: DataTypes.STRING,
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
   
  });
  //hasing password
  function generateHash(user) {
    if (user === null) {
        throw new Error('error');
    }
    else if (!user.changed('password')) return user.password;
    else {
        let salt = bcrypt.genSaltSync();
        return user.password = bcrypt.hashSync(user.password, salt);
    }
  } 
  Users.beforeCreate(generateHash);

  Users.beforeUpdate(generateHash);
  return Users;
};