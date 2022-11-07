const jwt = require("jsonwebtoken");
const authen = (req, res, next) => {
  try {
    console.log("token: ", req.cookies.jwt);
    const token = req.cookies.jwt;
    if (token) {
      console.log("have tken")
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      req.body.userId = decoded.id;
      next();
    }else{
      throw new Error(
        "you are not allowed to access this site. Please login to continue"
      );
    }
    
  } catch (err) {
    console.log("catch err here")
   return res.status(403).json({
        access: false,
        message: err.message,
    });
  }
};
module.exports = authen;
