const menuController = require('../controllers/menu')
const express = require("express")
const route = express.Router()

// GET ALL ITEMS IN MENU
route.get('/all-items', menuController.getAllItems)
// GET A SPECIFIC ITEM BY ID
route.get('/item/:id', menuController.getItemByID)
// GET ALL CATEGORIES
route.get('/category', menuController.getAllCategory)
// GET ALL ITEMS BY CATEGORY
route.get('/items-by-category/:id', menuController.getItemsByCategory)

module.exports = route