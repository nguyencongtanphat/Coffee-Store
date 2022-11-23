const item = require('./item')
const category = require('./category')
const detailReceipt = require('./detailReceipt')
const receipt = require('./receipt')
const user = require('./user')
const cart = require('./cart')
const blog = require('./blog')
const blogParagraph = require('./blogParagraph')
const paragraph = require('./paragraph')


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
    }),
    cart.belongsTo(user, {
        foreignKey: 'CustomerID'
    }),
    cart.belongsTo(item, {
        foreignKey: 'ItemID'
    })

    blogParagraph.belongsTo(blog, {
        foreignKey: 'blogID'
    })

    paragraph.belongsTo(blogParagraph, {
        foreignKey: 'BlogParagraphID'
    })
}

module.exports = associate