const userController = require('../controllers/user')
const express = require("express")
const User = require("../models/user");
const route = express.Router()


route.post("/signup", userController.userSignupController);
route.post("/login", userController.userPostLoginController);
route.get("/login", userController.userGetLoginController);
route.post("/update", userController.userUpdateController);
route.get("/", userController.getAllUserController);

module.exports = route