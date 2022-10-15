const itemModel = require('./item')
const categoryModel = require('./category')

const associate = _ => {
    itemModel.belongsTo(categoryModel, {
        foreignKey: 'Type'
    })
}

module.exports = associate