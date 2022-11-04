const jwt = require("jsonwebtoken");
const authen = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
   
    if (token) {
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      req.body.userId = decoded.id;
    }
    next();
  } catch (err) {
    res.status(403).json({
        access: false,
        message: "you are not allowed to access this site. Please login to continue",
    });
  }
};
module.exports = authen;
