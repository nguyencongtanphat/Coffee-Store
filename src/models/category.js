const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/databaseConn/sequelize')

class Category extends Model {}

Category.init({
    Name: DataTypes.STRING
}, {sequelize, modelName:'Category'})

module.exports = Category