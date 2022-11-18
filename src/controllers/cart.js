const cartModel = require('../models/cart')
const customerModel = require('../models/user')
const itemModel = require('../models/item')
const categoryModel = require('../models/category')
const { Op } = require('sequelize')

const cartController = {
    create: async (req, res, next) => {
        console.log("prodct:", req.body)
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

            const cartItemDB = await cartModel.findOne({
                where: {
                    CustomerID: cartReq.customerID,
                    ItemID: cartReq.itemID,
                    Size: cartReq.size
                },
                 include: [{
                    model: itemModel, attributes: ['Name', 'Image'],
                    include: [{
                        model: categoryModel, attributes: ['Name']
                    }]
                }]
            })
            let updatedCart
            if(cartItemDB){
                const quantityDB = cartItemDB.getDataValue('Quantity')
                const priceDB = cartItemDB.getDataValue('Price')
                updatedCart = await cartItemDB.update({
                    Quantity: quantityDB + cartReq.quantity,
                    Price: priceDB + cartReq.price
                })
            }else{
                updatedCart = await cartModel.create({
                    ItemID: cartReq.itemID,
                    Quantity: cartReq.quantity,
                    Size: cartReq.size,
                    Price: cartReq.price,
                    CustomerID: cartReq.customerID,
                    Status: "InCart"
                })
                if(!updatedCart){
                    throw "Create Error"
                }
            }
            

            return res.status(200).json({
                message: "Add To Card",
                data: updatedCart
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
                    model: itemModel, attributes: ['Name', 'Image'],
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
        
    },

    deleteCart: async(req, res, next) => {
        try{
            const idReq = req.params.id

            const cartDB = await cartModel.findByPk(idReq)

            if(!cartDB){
                throw "Cart does not exist!"
            }

            await cartDB.destroy()

            return res.status(200).json({
                message: "deleted"
            })
        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    },

    deleteCarts: async(req, res, next) => {
        try{
            
            const idsReq = req.body.IDs
            if(!idsReq) 
                throw "Provide ID"

            const cartsDB = await cartModel.findAll({
                where: {
                    id: {[Op.in]: idsReq }
                }
            })
            if(!cartsDB){
                throw "Cart does not exist!"
            }

            Promise.all(
                cartsDB.map(async cart => {
                    await cart.destroy()
                })
            )

            return res.status(200).json({
                message: "deleted"
            })
        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    },
}

module.exports = cartController