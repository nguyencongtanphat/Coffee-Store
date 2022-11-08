const User = require("../models/user");
const Address = require("../models/address");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { response } = require("express");
const saltRounds = 10;
const userController = {
  userSignupController: async (req, res) => {
    try {
      console.log(req.body)
      //check is username available
      const user = await User.findOne({
        where: { Username: req.body.Username },
      });
      if (user) {
        //username is existing
        res.json("your username is used, please enter another name");
      } else {
        //hash password
        const hash = await bcrypt.hash(req.body.Password, saltRounds);
        //create new user and write to database
        const newUser = User.build({
          Username: req.body.Username,
          Fullname: req.body.Fullname,
          Password: hash,
          PhoneNumber: req.body.PhoneNumber,
        });
        const responseUser = await newUser.save();
        // create a new Address
        const newAddress = Address.build({
          UserID: responseUser.id,
          Value: req.body.Address,
        });
        const responseAddress = await newAddress.save();

        res.json({
          success: true,
          message: "you have successfully create account",
          data: {
            userInfo: responseUser,
            userAddress: responseAddress,
          },
        });
      }
    } catch (e) {
      res.status(404).json({
        error: e,
      });
    }
  },
  userLoginController: async (req, res) => {
    try {
      const loginUser = req.body;
      console.log("userInfo1:", req.body);
      //check is username existing
      const user = await User.findOne({
        where: { Username: loginUser.Username },
      });

      if (user) {
        //check password
        let isPasswordCorrect = await bcrypt.compare(
          loginUser.Password,
          user.Password
        );
        if (!isPasswordCorrect)
          throw new Error(
            `Password is incorrect, ${loginUser.Password}, ${user.Password}`
          );

        //password correct
        const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, {
          expiresIn: "1h",
        });
        //set jwt to cookie
        res.cookie("jwt", token, { httpOnly: true, secure: false });

        res.status(200).json({
          message: "login successfully",
          userInfo: {
           user
          },
        });
      } else {
        res.status(404).json("user not found");
      }
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  },
};

module.exports = userController;
