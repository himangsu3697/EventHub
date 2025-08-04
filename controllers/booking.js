const User = require("../models/user.js");
const Event = require("../models/event.js");
const Booking = require("../models/booking.js");

//get payment option controller
module.exports.getPaymentOption = async (req, res) => {
    const { eid, uid } = req.params;
    req.session.uid = uid;
    req.session.eid = eid;
    const event = await Event.findById(eid);
    const user = await User.findById(uid);
    res.render("./booking/index.ejs", { event, user });
}

//show all bookings controllers
module.exports.showAllBookings = async(req, res) => {
    const id = req.user._id;
    const user = await User.findById(id).populate({path : "bookings",populate : {path : "event"}});
    if(!(user.bookings && user.bookings.length>0)) {
        req.flash("error", "You haven't Booked an Event yet");
        return res.redirect("/events");
    }
    let events = [],i=0;
    for(booking of user.bookings) {
        events[i++] = booking.event;
    } 
    res.render("./booking/allBooking.ejs", {events});
}

//show a individual booking controller
module.exports.showBooking = async(req, res) => {
    const {id} = req.params;
    const event = await Event.findById(id).populate("owner");
    const booking = await Booking.findOne({user : req.user._id, event : id});
    if(!event) {
        req.flash("error", "No such event exist");
        return res.redirect("/events/bookings/showAllBookings");
    }
    res.render("./booking/showBooking.ejs", {event, booking});
}

//delete a booking controller
module.exports.deleteBooking = async(req, res) => {
    const {bid, uid} = req.params;
    const user = await User.findById(uid);
    user.bookings = user.bookings.filter((v) => {
        return v!=bid;
    });
    await Booking.findByIdAndDelete(bid);
    await user.save();
    req.flash("success", "Booking Deleted Successfully");
    res.redirect("/events/bookings/showAllBookings");
}


