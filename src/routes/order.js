
const express = require("express")
const route = express.Router()

const orderController = require('../controllers/order')
const authen = require("../utils/middleware/authen")

route.get('/', authen, orderController.getAllOrders)
route.get('/customer/:id', authen, orderController.getOrdersbyCustomer)
route.get('/:id', orderController.getOrderByID)
route.post('/create', orderController.create)



module.exports = route