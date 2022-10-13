const userController = require('../controllers/user')
const express = require("express")
const User = require("../models/user");
const route = express.Router()

route.get('/',async (req, res) => {
    const users = await User.findAll();
    console.log("user:",users);
    res.send(`get all user here,${users}`);
});

route.post("/signup", userController.userSignupController);
route.get("/login", userController.userLoginController);

module.exports = route