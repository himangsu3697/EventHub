const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {getSignupForm, createUser, getLoginForm, loginUser, logoutUser} = require("../controllers/User.js");

//rout to get the signup form 
router.get("/signup" ,getSignupForm);

//route for signup or create new User
router.post("/signup" ,wrapAsync(createUser));

//rout to get login form
router.get("/login" ,getLoginForm);

//route to login User
router.post("/login", 
    passport.authenticate("local", {failureRedirect : "/events/Users/login", failureFlash : true}),
    loginUser
);

//rout to logout User
router.get("/logout", logoutUser);

module.exports = router;
