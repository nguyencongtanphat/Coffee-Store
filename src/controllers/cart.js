const cartModel = require('../models/cart')
const customerModel = require('../models/user')
const itemModel = require('../models/item')
const categoryModel = require('../models/category')

const cartController = {
    create: async (req, res, next) => {
        try{
            const cartReq = {
                itemID: req.body.ItemID,
                quantity: req.body.Quantity,
                size: req.body.Size,
                price: req.body.Price,
                customerID: req.body.CustomerID
            }

            const customerDB = await customerModel.findByPk(cartReq.customerID)
            if(!customerDB){
                throw "Customer not found"
            }

            const newCart = await cartModel.create({
                ItemID: cartReq.itemID,
                Quantity: cartReq.quantity,
                Size: cartReq.size,
                Price: cartReq.price,
                CustomerID: cartReq.customerID,
                Status: "InCart"
            })
            if(!newCart){
                throw "Create Error"
            }

            return res.status(200).json({
                message: "Add To Card",
                data: newCart
            })

        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    },
    getCartsByCustomer: async (req, res) => {
        try{
            const customerID = req.params.id
            const cartDB = await cartModel.findAll({
                where: {CustomerID: customerID},
                include: [{
                    model: itemModel, attributes: ['Name'],
                    include: [{
                        model: categoryModel, attributes: ['Name']
                    }]
                }]
            })

            return res.status(200).json({
                message: "Get Cart By Customer ID",
                data: cartDB
            })
        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
        
    }
}

module.exports = cartController