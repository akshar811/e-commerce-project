const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  let { token } = req.cookies;
  if (token) {
    let decode = jwt.verify(token, "token");
    next();
  } else {
    res.send({ msg: "user not logged in" });
  }
};

module.exports = Auth;
