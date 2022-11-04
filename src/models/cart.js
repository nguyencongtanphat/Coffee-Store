const { Sequelize, Model, DataTypes } = require('sequelize')
const database = require('../utils/databaseConn/connection')
const sequelize = require('../utils/databaseConn/sequelize')

class Cash extends Model {}

Cash.init({
    Quantity: DataTypes.INTEGER,
    Size: {
        type: DataTypes.ENUM,
        values: ['Small', 'Medium', 'Large']
    },
    Price: DataTypes.INTEGER,
    Status: {
        type: DataTypes.ENUM('Done', 'InCart'),
        defaultValue: 'InCart'
    }
}, {sequelize, modelName:'CASH'})

module.exports = Cash