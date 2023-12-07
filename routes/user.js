const { Router } = require("express");
const { displayreg, register, displaylogin, login, profile } = require("../controllers/user.controller");
const Auth = require("../middleware/auth");

const userRouter = Router();

userRouter.get("/reg",displayreg);

userRouter.post("/reg",register);

userRouter.get("/login",displaylogin);

userRouter.post("/login",login);


userRouter.get("/profile",profile);

module.exports = userRouter;

