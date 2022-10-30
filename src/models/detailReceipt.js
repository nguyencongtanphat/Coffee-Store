const { Sequelize, Model, DataTypes } = require('sequelize')
const database = require('../utils/databaseConn/connection')
const sequelize = require('../utils/databaseConn/sequelize')

class DetailReceipt extends Model {}

DetailReceipt.init({
    Quantity: DataTypes.INTEGER,
    Size: {
        type: DataTypes.ENUM,
        values: ['Small', 'Medium', 'Large']
    },
    Price: DataTypes.INTEGER
}, {sequelize, modelName:'DetailReceipt'})

module.exports = DetailReceipt