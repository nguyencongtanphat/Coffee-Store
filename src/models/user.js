const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/databaseConn/sequelize')

class User extends Model {}

User.init(
  {
    Username: {
      type: DataTypes.TEXT,
      require: true,
    },
    Fullname: {
      type: DataTypes.TEXT,
      require: true,
    },
    Password: {
      type: DataTypes.TEXT,
      require: true,
    },
    PhoneNumber: {
      type: DataTypes.TEXT,
      require: true,
    },
  },
  { sequelize, modelName: "User" }
);

module.exports = User