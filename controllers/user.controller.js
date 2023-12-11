const user = require("../models/user.schema");
const bcrypt = require("bcrypt");
const cookies = require("cookie-parser");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpgenerator = require("otp-generator");


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
    res.redirect("/user/login");
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

const usera = async (req, res) => {
  let data = await user.find();
  res.send(data);
};

const profile = (req, res) => {
  res.render("profile");
};

//nodemailer

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aksharambaliya6@gmail.com",
    pass: "gczb bjpg ifct tnop",
  },
});

let otp;

const resetpass = (req, res) => {
  otp = otpgenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  let { email } = req.body;
  const mailoptions = {
    from: "aksharambaliya6@gmail.com",
    to: email,
    subject: "password reset",
    html: `<a href=http://localhost:8080/user/verify/${otp}>click here to verify otp ${otp}</a>`,
  };
  transporter.sendMail(mailoptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
  res.send("sending otp");
};

const verify = (req, res) => {
  let verifyotp = req.params.otp;
  if (verifyotp === otp) {
    // res.send("verified otp");
    res.redirect("/user/newpass");
  } else {
    res.send("Invalid otp");
  }
};


const forgetpass = (req, res) => {
  res.render("forgetpass")
}

const newpassword = (req, res) => {
  res.render("newpassword")
}


const updatepassword = async (req, res) => {
  const { oldpassword, newpassword } = req.body;

  try { 
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (oldpassword !== user.password) {
      return res.status(401).send("Incorrect old password");
    }

    user.password = newpassword;
    await user.save();

    res.send("Password updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { displayreg, register, displaylogin, login ,usera,profile,resetpass , verify  ,forgetpass , newpassword , updatepassword };
