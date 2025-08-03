const CustomError = require("../utils/customError.js");
const User = require("../models/User.js");

//get sigup form controller 
module.exports.getSignupForm = (req, res) => {
    res.render("./User/signup.ejs");
}

//create new User controller
module.exports.createUser = async(req, res) => {
    if(!req.body.User) {
        throw new CustomError(400,"Send valid data for User");
    }
    const {Username, password, email} = req.body.User;
    const newUser = new User({
        email : email,
        Username : Username,
    });
    await User.register(newUser,password);
    req.flash("success", "Signup Successfully");
    res.redirect("/events/Users/login");
}

//get login form controller
module.exports.getLoginForm =  (req, res) => {
    res.render("./User/login.ejs");
}

//login User controller
module.exports.loginUser = (req, res) => {
        req.flash("success", "Login Successfully");
        res.redirect("/events");
}

//logout User controller
module.exports.logoutUser = (req, res, next) => {
    req.logOut((err) => {
        if(err) {
            next(err);
        }
        req.flash("success", "You are Logged out");
        res.redirect("/events");
    });
}

