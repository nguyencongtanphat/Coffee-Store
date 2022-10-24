const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/databaseConn/sequelize')

class Receipt extends Model {}

Receipt.init({
    PhoneNumber: DataTypes.STRING,
    Address: DataTypes.STRING,
    CustomerType: {
        type: DataTypes.ENUM,
        values: ['Member', 'Non-Member']
    },
    CustomerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    TotalAmount: DataTypes.INTEGER
}, {sequelize, modelName:'Receipt'})

module.exports = Receipt