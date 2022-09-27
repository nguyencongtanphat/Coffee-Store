const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/databaseConn/sequelize')

class Item extends Model {}

Item.init({
    Name: DataTypes.STRING,
    Size: {
        type: DataTypes.ENUM,
        values: ['Small', 'Medium', 'Large']
    },
    Price: DataTypes.INTEGER,
    Type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'ItemType',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {sequelize, modelName:'Item'})

module.exports = Item