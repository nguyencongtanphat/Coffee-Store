const sequelize = require('./sequelize')
const userModel = require('../../models/user')
const addressModel = require('../../models/address')
const categoryModel = require('../../models/category')
const itemModel = require('../../models/item')
const receiptModel = require('../../models/receipt')
const detailReceipt = require('../../models/detailReceipt')
const associate = require('../../models/association')
const fs = require('fs')
const readline = require('readline')
const database = {
        isConnected: async () => {
            await sequelize.authenticate()
            .then(async () => {
                const isForce = false;
                associate()
                await sequelize.sync({force: isForce})
                
                // load data
                if(isForce){
                    const fileName = process.env.DATAFILE
                    const rawData = fs.createReadStream(fileName)
                    const rl = readline.createInterface({
                        input: rawData,
                        crlfDelay: Infinity
                    })
                    for await (const line of rl){
                        console.log(line)
                        if(line)
                            sequelize.query(line)
                        else
                            console.log(line)
                    }
                    
                }
                console.log('Connection has been established successfully!')
            })
            .catch(err => {
                console.log('Unable to connect to the database: ', err)
            })
        }
}

module.exports = database