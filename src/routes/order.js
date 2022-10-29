
const express = require("express")
const route = express.Router()

const orderController = require('../controllers/order')

route.get('/', orderController.getAllOrders)
route.get('/customer/:id', orderController.getOrdersbyCustomer)
route.get('/:id', orderController.getOrderByID)
route.post('/create', orderController.create)



module.exports = route