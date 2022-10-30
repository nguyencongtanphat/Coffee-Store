const menuController = require('../controllers/menu')
const express = require("express")
const route = express.Router()


// GET A SPECIFIC ITEM BY ID
route.get("/products/:id", menuController.getItemByID);
// GET ALL ITEMS IN MENU
route.get('/products',()=>{
    console.log("all items")
}, menuController.getAllItems)
// GET ALL CATEGORIES
route.get('/categories', menuController.getAllCategory)
// GET ALL ITEMS BY CATEGORY
route.get("/categories/:id", menuController.getItemsByCategory);

module.exports = route