const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/databaseConn/sequelize')

class User extends Model {}

User.init({
    Username: {
        type: DataTypes.TEXT,
        require: true
    }, 
    Password: {
        type: DataTypes.TEXT,
        require: true
    },
    PhoneNumber: {
        type: DataTypes.TEXT,
        require: true
    }
}, {sequelize, modelName:'user'})

module.exports = User