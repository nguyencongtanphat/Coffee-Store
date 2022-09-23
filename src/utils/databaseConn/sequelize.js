const {Sequelize} = require('sequelize')

//CONNECT LOCALHOST
const sequelize = new Sequelize('coffee', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true
    }
})

module.exports = sequelize