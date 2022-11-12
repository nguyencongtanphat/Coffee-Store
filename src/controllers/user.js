const User = require("../models/user");
const Address = require("../models/address");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { response } = require("express");
const saltRounds = 10;
const userController = {
  userSignupController: async (req, res) => {
    try {
      //check is username available
      const user = await User.findOne({
        where: { Username: req.body.Username },
      });
      if (user) {
        //username is existing
        res
          .status(401)
          .json("your username is used, please enter another name");
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
  userPostLoginController: async (req, res) => {
    try {
      console.log("login post");

      const loginUser = req.body;

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
        if (!isPasswordCorrect) throw new Error(`Password is incorrect`);

        //password correct
        const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, {
          expiresIn: "1h",
        });

        const address = await Address.findAll({
          where: {
            UserID:user.id,
          },
        });

        console.log("Address: ", address)

        res.status(200).json({
          message: "login successfully",
          accessToken: token,
          userInfo: {
            user,
            address
          },
        });
      } else {
        res.status(401).json({
          message: "User not found",
        });
      }
    } catch (e) {
      console.log("error+", e.message);
      res.status(400).json({
        error: e.message,
      });
    }
  },
  userGetLoginController: async (req, res) => {
    try {
      console.log("login get");
      if (!req.header("Authorization"))
        throw new Error(
          "This session is ended. Please login again to continue"
        );
      const token = req.header("Authorization").replace("Bearer ", "");
      console.log("token: ", token);
      const decodedUserId = jwt.verify(token, process.env.PRIVATE_KEY);
      const user = await User.findOne({
        where: { id: decodedUserId.id },
      });
      console.log("user from get login:", user);
      if (user)
      {
        const address = await Address.findAll({
          where: {
            UserID: user.id,
          },
        });


        return res.status(200).json({
          user: user,
          address:address,
        });
      }
        
      throw new Error("This session is ended. Please login again to continue");
    } catch (err) {
      console.log("catch err here", err.message);
      return res.status(403).json({
        access: false,
        message: err.message,
      });
    }
  },
  getAllUserController: async (req, res, next) => {
    try {
      const users = await User.findAll({});
      return res.status(200).json({
        message: "Get All user by DB",
        data: users,
      });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  },
};

module.exports = userController;
