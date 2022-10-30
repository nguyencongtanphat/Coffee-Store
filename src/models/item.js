const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/databaseConn/sequelize')

class Item extends Model {}

Item.init({
    Name: DataTypes.STRING,
    SPrice: DataTypes.INTEGER,
    MPrice: DataTypes.INTEGER,
    LPrice: DataTypes.INTEGER
}, {sequelize, modelName:'Item'})

module.exports = Item