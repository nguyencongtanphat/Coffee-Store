const sequelize = require('./sequelize')
const userModel = require('../../models/user')
const addressModel = require('../../models/address')

const database = {
        isConnected: async () => {
            await sequelize.authenticate()
            .then(async () => {
                await sequelize.sync({force: true})
                console.log('Connection has been established successfully!')
            })
            .catch(err => {
                console.log('Unable to connect to the database: ', err)
            })
        }
}

module.exports = database