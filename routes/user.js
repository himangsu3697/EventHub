const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {getSignupForm, createuser, getLoginForm, loginuser, logoutuser} = require("../controllers/user.js");

//rout to get the signup form 
router.get("/signup" ,getSignupForm);

//route for signup or create new user
router.post("/signup" ,wrapAsync(createuser));

//rout to get login form
router.get("/login" ,getLoginForm);

//route to login user
router.post("/login", 
    passport.authenticate("local", {failureRedirect : "/events/users/login", failureFlash : true}),
    loginuser
);

//rout to logout user
router.get("/logout", logoutuser);

module.exports = router;
