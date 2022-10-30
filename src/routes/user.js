const userController = require('../controllers/user')
const express = require("express")
const User = require("../models/user");
const route = express.Router()


route.post("/signup", userController.userSignupController);
route.get("/login", userController.userLoginController);

module.exports = route