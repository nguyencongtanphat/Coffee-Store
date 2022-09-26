const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/databaseConn/sequelize')

class ItemType extends Model {}

ItemType.init({
    Name: DataTypes.STRING
}, {sequelize, modelName:'itemtype'})

module.exports = ItemType