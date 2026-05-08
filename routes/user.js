const express = require("express");
const router =express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js")
const usersRoute=require("../controllers/users.js")

//SIGNUP USER
router.get("/signup",usersRoute.renderSignupForm)

router.post("/signup",wrapAsync(usersRoute.signupUser))

//login USer
router.get("/login",usersRoute.renderLogInForm)

//(for log in possport is doing thing not us)
router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true,}),usersRoute.login)


//logout route
router.get("/logout",usersRoute.logout)

module.exports=router;