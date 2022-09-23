const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/databaseConn/sequelize')

class Address extends Model {}

Address.init({
    Value: {
        type: DataTypes.STRING
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {sequelize, modelName:'Address'})

module.exports = Address