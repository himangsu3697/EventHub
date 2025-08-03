const Event =  require("../models/event.js");

module.exports.isLoggedin = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash("error","user must be logged in");
        return res.redirect("/events/users/login");
    }
    next();
}


module.exports.isOwner = async(req, res, next) => {
    const {id} = req.params;
    const event = await Event.findById(id);
    if(!req.user._id.equals(event.owner)) {
        req.flash("error","You are not the owner of the event");
        return res.redirect(`/events/${id}`);
    }
    next();
}
