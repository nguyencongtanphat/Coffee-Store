const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
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
        res.json("your username is used, please enter another name");
      } else {
        //hash password
        bcrypt.hash(req.body.Password, saltRounds,  async (err, hash)=> {
          // Store hash in your password DB.
          if(err){
            throw Error(err.message);
          }else{
            //create new user and write to database
            const newUser = User.build({
              Username: req.body.Username,
              Password: hash,
              PhoneNumber: req.body.PhoneNumber,
            });
            const response = await newUser.save();
            res.json({
              success: true,
              message: "you have successfully create account",
              data: response,
            });
          }
        });

        
      }
    } catch (e) {
      res.status(404).json(e)
      //res.send("error", e);
    }
  },
  userLoginController: async (req, res) => {
    try{
      const loginUser = req.body;
      //check is username existing
      const user = await User.findOne({
        where: { Username: loginUser.Username },
      });

      if (user) {
        //check password
        bcrypt.compare(loginUser.Password, user.Password, function (err, result) {
          console.log("result", result);
          if(result){
            //password is correct
            const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, {
              expiresIn: "1h",
            });
            //set jwt to cookie
            res.cookie("jwt", token, { httpOnly: true, maxAge: 3600 });

            res.status(200).json({
              message: "login successfully",
              userInfo: {
                Username: user.Username,
                PhoneNumber: user.PhoneNumber,
              },
            });
          }
          else{
            throw new Error(`Some thing went wrong ${err.message}`);
          }
        });
      }else{
        res.json({
          message:"user name is not existing, please signup",
        })
      }
    }catch (e) {
      res.json({
        error: e.message,
      })
    }
  },
};

module.exports = userController