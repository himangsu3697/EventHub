const User = require("../models/User.js");
const Event = require("../models/event.js");
const Booking = require("../models/booking.js");

//get payment option controller
module.exports.getPaymentOption = async (req, res) => {
    const { eid, uid } = req.params;
    req.session.uid = uid;
    req.session.eid = eid;
    const event = await Event.findById(eid);
    const User = await User.findById(uid);
    res.render("./booking/index.ejs", { event, User });
}

//show all bookings controllers
module.exports.showAllBookings = async(req, res) => {
    const id = req.User._id;
    const User = await User.findById(id).populate({path : "bookings",populate : {path : "event"}});
    if(!(User.bookings && User.bookings.length>0)) {
        req.flash("error", "You haven't Booked an Event yet");
        return res.redirect("/events");
    }
    let events = [],i=0;
    for(booking of User.bookings) {
        events[i++] = booking.event;
    } 
    res.render("./booking/allBooking.ejs", {events});
}

//show a individual booking controller
module.exports.showBooking = async(req, res) => {
    const {id} = req.params;
    const event = await Event.findById(id);
    const booking = await Booking.findOne({User : req.User._id, event : id});
    if(!event) {
        req.flash("error", "No such event exist");
        return res.redirect("/events/bookings/showAllBookings");
    }
    res.render("./booking/showBooking.ejs", {event, booking});
}

//delete a booking controller
module.exports.deleteBooking = async(req, res) => {
    const {bid, uid} = req.params;
    const User = await User.findById(uid);
    for(let i=0; i<User.bookings.length; i++) {
        if(User.bookings[i]==bid) {
            User.bookings.splice(i,1);
            await User.save();
            req.flash("success", "Booking Deleted Successfully");
            return res.redirect("/events/bookings/showAllBookings");
        }
    }
}


