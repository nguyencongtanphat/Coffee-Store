const jwt = require("jsonwebtoken");
const authen = (req, res, next) => {
  try {
    if (!req.header("Authorization"))
      throw new Error(
        "you are not allowed to access this site. Please login to continue"
      );
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    
    req.body.userId = decoded.id;
    next();
  } catch (err) {
    console.log("catch err here authen", err.message);
    return res.status(403).json({
      access: false,
      message: err.message,
    });
  }
};
module.exports = authen;
