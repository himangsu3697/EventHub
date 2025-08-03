const CustomError = require("../utils/customError.js");
const User = require("../models/user.js");

//get sigup form controller 
module.exports.getSignupForm = (req, res) => {
    res.render("./user/signup.ejs");
}

//create new user controller
module.exports.createuser = async(req, res) => {
    if(!req.body.user) {
        throw new CustomError(400,"Send valid data for user");
    }
    const {username, password, email} = req.body.user;
    const newuser = new User({
        email : email,
        username : username,
    });
    await User.register(newuser,password);
    req.flash("success", "Signup Successfully");
    res.redirect("/events/users/login");
}

//get login form controller
module.exports.getLoginForm =  (req, res) => {
    res.render("./user/login.ejs");
}

//login user controller
module.exports.loginuser = (req, res) => {
        req.flash("success", "Login Successfully");
        res.redirect("/events");
}

//logout user controller
module.exports.logoutuser = (req, res, next) => {
    req.logOut((err) => {
        if(err) {
            next(err);
        }
        req.flash("success", "You are Logged out");
        res.redirect("/events");
    });
}

