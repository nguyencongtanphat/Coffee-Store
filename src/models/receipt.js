const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/databaseConn/sequelize')

class Receipt extends Model {}

Receipt.init({
    PhoneNumber: DataTypes.STRING,
    Address: DataTypes.STRING,
    CustomerType: {
        type: DataTypes.ENUM,
        values: ['Member', 'Non-Member'],
        defaultValue: 'Non-Member'
    },
    TotalAmount: DataTypes.INTEGER,
    // Status: {
    //     type: DataTypes.ENUM,
    //     values: ['InProgress', 'Completed']
    // },
}, {sequelize, modelName:'Receipt'})

module.exports = Receipt