const user = require("../models/user.schema");
const bcrypt = require("bcrypt");
const cookies = require("cookie-parser");
const jwt = require("jsonwebtoken");

const displayreg = (req, res) => {
  res.render("signup");
};

const register = async (req, res) => {
  let { username, email, password } = req.body;
  const User = await user.findOne({ email });

  if (User) {
    return res.redirect("/user/login");
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    let obj = {
      username: username,
      email: email,
      password: hash,
    };
    let val = await user.create(obj);
    let token = jwt.sign({ id: val.id }, "token");
    res.cookie("token", token);
    res.redirect(  "/user/login" );
  });
};

const displaylogin = (req, res) => {
  res.render("login");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let data = await user.findOne({ email });
  if (data) {
    bcrypt.compare(password, data.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ id: data._id }, "token");
        res.cookie("token", token);
        res.redirect("/product/pro");
      } else {
        res.send({ msg: "Password incorrect" });
      }
    });
  } else {
    res.send({ msg: "User not found" });
  }
};

const usera =async (req, res) => {
  let data = await user.find();
  res.send(data);
}
module.exports = { displayreg, register, displaylogin, login ,usera };
