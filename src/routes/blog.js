const express = require("express")
const route = express.Router()
const blogController = require('../controllers/blog')

route.post('/', blogController.create)
route.get('/', blogController.getAllBlogs)
route.get('/newest', blogController.getNewestBlogs)
route.get('/:id', blogController.getBlogByID)

module.exports = route
