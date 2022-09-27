const { Sequelize, Model, DataTypes } = require('sequelize')
const database = require('../utils/databaseConn/connection')
const sequelize = require('../utils/databaseConn/sequelize')

class DetailReceipt extends Model {}

DetailReceipt.init({
    ReceiptID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Receipt',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    ItemID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Item',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    quantity: DataTypes.INTEGER
}, {sequelize, modelName:'DetailReceipt'})

module.exports = DetailReceipt