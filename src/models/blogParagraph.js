const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/databaseConn/sequelize')

class BlogParagraph extends Model {}

BlogParagraph.init({
    Title: DataTypes.TEXT,
    Image: DataTypes.TEXT,
    ImageCaption: DataTypes.TEXT,
    ImagePosition: DataTypes.INTEGER
}, {sequelize, modelName:'BlogParagraph'})

module.exports = BlogParagraph