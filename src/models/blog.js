const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/databaseConn/sequelize')

class Blog extends Model {}

Blog.init({
    Title: DataTypes.TEXT,
    Date: DataTypes.DATEONLY,
    Description: DataTypes.TEXT,
    Conclusion: DataTypes.TEXT,
    TitleImage: DataTypes.TEXT
}, {sequelize, modelName:'Blog'})

module.exports = Blog