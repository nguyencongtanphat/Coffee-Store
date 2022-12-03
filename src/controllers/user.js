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
        res.status(401).json("tên người dùng(username) đã tồn tại");
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
          message: "bạn đã thêm đăng nhập thành công",
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
        if (!isPasswordCorrect) throw new Error(`Mật khẩu không chính xác`);

        //password correct
        const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, {
          expiresIn: "1h",
        });

        const address = await Address.findAll({
          where: {
            UserID: user.id,
          },
        });

        console.log("Address: ", address);

        res.status(200).json({
          message: "Đăng nhập thành công",
          accessToken: token,
          userInfo: {
            user,
            address,
          },
        });
      } else {
        res.status(401).json({
          message: "Người dùng không tồn tại",
        });
      }
    } catch (e) {
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
          "phiên làm việc đã kết thúc bạn cần đăng nhập lại để tiếp tục"
        );
      const token = req.header("Authorization").replace("Bearer ", "");
      console.log("token: ", token);
      const decodedUserId = jwt.verify(token, process.env.PRIVATE_KEY);
      const user = await User.findOne({
        where: { id: decodedUserId.id },
      });
      console.log("user from get login:", user);
      if (user) {
        const address = await Address.findAll({
          where: {
            UserID: user.id,
          },
        });

        return res.status(200).json({
          user: user,
          address: address,
        });
      }

      throw new Error(
        "phiên làm việc đã kết thúc bạn cần đăng nhập lại để tiếp tục"
      );
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
  userUpdateController: async function (req, res, next) {
    try {
      const userInfo = req.body;
      //find user by id
      const user = await User.findOne({
        where: { id: userInfo.id },
      });

      if (user) {
        //find address
        const address = await Address.findOne({
          where: {
            UserID: user.id,
          },
        });
        console.log("addreess", address);

        address.set({
          Value: userInfo.Address,
        });
        user.set(userInfo);
        const responseUser = await user.save();
        const responseAddress = await address.save();
        res.json({
          userInfo: responseUser,
          address: [responseAddress]
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e });
    }
  },
};

module.exports = userController;
