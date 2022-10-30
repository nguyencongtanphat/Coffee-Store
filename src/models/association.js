const item = require('./item')
const category = require('./category')
const detailReceipt = require('./detailReceipt')
const receipt = require('./receipt')
const user = require('./user')

const associate = _ => {
    item.belongsTo(category, {
        foreignKey: 'Type'
    })
    receipt.belongsTo(user, {
        foreignKey: 'CustomerID'
    }),
    detailReceipt.belongsTo(receipt, {
        foreignKey: 'ReceiptID'
    }),
    detailReceipt.belongsTo(item, {
        foreignKey: 'ItemID'
    })
}

module.exports = associate