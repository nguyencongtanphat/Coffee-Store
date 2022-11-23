const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/databaseConn/sequelize')

class Paragraph extends Model {}

Paragraph.init({
    Content: DataTypes.TEXT
}, {sequelize, modelName:'Paragraph'})

module.exports = Paragraph