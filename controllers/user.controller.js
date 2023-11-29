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
    return res.json({ msg: "Email ID already exists" });
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    let obj = {
      username: username,
      email: email,
      password: hash,
    };
    let val = await user.create(obj);
    res.json({ msg: "user created successfully", data: val });
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
        res.redirect("/user/product");
      } else {
        res.send({ msg: "Password incorrect" });
      }
    });
  } else {
    res.send({ msg: "User not found" });
  }
};

const product = (req, res) => {
  res.render("product");
};

module.exports = { displayreg, register, displaylogin, login, product };
