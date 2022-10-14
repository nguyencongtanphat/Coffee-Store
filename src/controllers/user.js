const User = require("../models/user");

const userController = {
  userSignupController: async (req, res) => {
    try {
      //check is user name available
      const user = await User.findOne({
        where: { Username: req.body.Username },
      });
      if (user) {
        //username is existing
        res.json("your username is used, please enter another name");
      } else {
        //create new user and write to database
        const newUser = User.build({
          Username: req.body.Username,
          Password: req.body.Password,
          PhoneNumber: req.body.PhoneNumber,
        });
        const response = await newUser.save();
        res.json({
          success: true,
          message: "you have successfully create account",
          data: response,
        });
      }
    } catch (e) {
      res.send("error", e);
    }
  },
};

module.exports = userController