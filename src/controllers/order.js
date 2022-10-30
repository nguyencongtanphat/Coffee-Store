const receiptModel = require('../models/receipt')
const detailReceiptModel = require('../models/detailReceipt')
const customerModel = require('../models/user')
const itemModel = require('../models/item')
const userModel = require('../models/user')
//Request Item Array format
/*
[{
    ID: 1,
    Quantity: 2,
    Size: 'Small',
    Price: 98000
}, {
    ID: 4,
    Quantity: 1,
    Size: 'Medium',
    Price: 49000
}]
*/

const orderController = {
    create: async(req, res, next) => {
        try{

            const orderReq = {
                items: req.body.Items,
                customerType: req.body.CustomerType, // 'Member', 'Non-Member'
                customerID: req.body.CustomerID,
                phoneNumber: req.body.PhoneNumber,
                address: req.body.Address,
                totalAmount: req.body.TotalAmount 
            }

            // CHECK REQUEST
            if(!orderReq.customerType || !orderReq.phoneNumber || !orderReq.address){
                throw 'Customer_Type, PhoneNumber, Address are required!'
            }
            if(orderReq.customerType == 'Member'){
                if(!orderReq.customerID)
                    throw 'Customer ID is required!'
                
                const customerDB = await customerModel.findByPk(orderReq.customerID)
                if(!customerDB)
                    throw 'Customer ID invalid!'
            }
            
            // INSERT DATA
            const newReceipt = await receiptModel.create({
                CustomerID: orderReq.customerID,
                CustomerType: orderReq.customerType,
                PhoneNumber: orderReq.phoneNumber,
                Address: orderReq.address,
                TotalAmount: orderReq.totalAmount ?? '0' ,
               // Status: "InProgress"
            })
            if(!newReceipt){
                throw 'Insert Receipt Error'
            }
            const newReceiptID = newReceipt.getDataValue('id')
            Promise.all(
                orderReq.items.map(async item => {
                    let newDetail = await detailReceiptModel.create({
                        ItemID: item.ID ?? null,
                        ReceiptID: newReceiptID,
                        Quantity: item.Quantity,
                        Size: item.Size,
                        Price: item.Price
                    })
                    if(!newDetail)
                        throw 'Insert Detail Receipt Error'
                })
            )

            return res.status(200).json({
                Message: "Create Order",
                Order: newReceipt,
                Items: orderReq.items
            })
        }catch(error){
            return res.status(404).json({
                Message: error, 
                
            })
        }
    },

    getOrdersbyCustomer: async (req, res, next) => {
        try{
            const customerID = req.params.id
            //CHECK CUSTOMER
            const customerDB = await userModel.findByPk(customerID)
            if(!customerDB)
                throw 'Customer Not Found!'
            const ordersDB = await receiptModel.findAll({
                where: {CustomerID: customerID}
            });
            const ordersRes = []
            if(ordersDB){
                await Promise.all(ordersDB.map(async order => {
                    let orderRes = {...order.toJSON()}
                    const receiptID = order.getDataValue('id')
                    let detailDB = await detailReceiptModel.findAll({
                        where: {
                            ReceiptID: receiptID
                        },
                        include:[{
                            model: itemModel, attributes: ['Name']
                        }]
                    })
                    orderRes.DetailOrder = detailDB
                    ordersRes.push(orderRes)
                }))
            }

            return res.status(200).json({
                Message: "Get Orders By Customer Success", 
                Orders: ordersRes
            })

        }catch(error){
            return res.status(404).json({
                Message: error.message ?? error, 
                
            })
        }
    },

    getAllOrders:  async (req, res, next) => {
        try{
            const ordersDB = await receiptModel.findAll();
            const ordersRes = []
            if(ordersDB){
                await Promise.all(ordersDB.map(async order => {
                    let orderRes = {...order.toJSON()}
                    const receiptID = order.getDataValue('id')
                    let detailDB = await detailReceiptModel.findAll({
                        where: {
                            ReceiptID: receiptID
                        },
                        include:[{
                            model: itemModel, attributes: ['Name']
                        }]
                    })
                    orderRes.DetailOrder = detailDB
                    ordersRes.push(orderRes)
                }))
                return res.status(200).json({
                    Message: "Get All Orders Success", 
                    Orders: ordersRes
                })
            }else
            {
                return res.status(200).json({
                    Message: "No Order", 
                })
            }

            
        }catch(error){
            return res.status(404).json({
                Message: error.message ?? error 
                
            })
        }
    },

    getOrderByID:  async (req, res, next) => {
        try{
            const orderID = req.params.id
            const orderDB = await receiptModel.findByPk(orderID);
            if(!orderDB)
                throw 'Order not found'

            let detailDB = await detailReceiptModel.findAll({
                where: {
                    ReceiptID: orderID
                },
                include:[{
                    model: itemModel, attributes: ['Name']
                }]
            })

            let orderRes = {
                ...orderDB.toJSON(),
                DetailOrder: detailDB
            }

            return res.status(200).json({
                Message: "Get Order By ID Success", 
                Orders: orderRes
            })
        }catch(error){
            return res.status(404).json({
                Message: error.message ?? error
                
            })
        }
    },
}

module.exports = orderController