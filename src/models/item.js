const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/databaseConn/sequelize')

class Item extends Model {}

Item.init({
    Name: DataTypes.STRING,
    Size: {
        type: DataTypes.ENUM,
        values: ['Small', 'Medium', 'Large']
    },
    Price: DataTypes.INTEGER
}, {sequelize, modelName:'Item'})

module.exports = Item