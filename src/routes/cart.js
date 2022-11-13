const express = require("express")
const route = express.Router()
const cartController = require('../controllers/cart')

route.post("/", cartController.create)
route.get("/:id", cartController.getCartsByCustomer)
route.delete("/:id", cartController.deleteCart)

module.exports = route