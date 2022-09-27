const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/databaseConn/sequelize')

class ItemType extends Model {}

ItemType.init({
    Name: DataTypes.STRING
}, {sequelize, modelName:'ItemType'})

module.exports = ItemType