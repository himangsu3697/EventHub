const CustomError = require("../utils/customError.js");
const Event = require("../models/event.js");
const Booking = require("../models/booking.js");

//show all events controller
module.exports.showAllEvents = async (req, res) => {
    const events = await Event.find({});
    res.render("./event/index.ejs", {events});
}

//about page controller
module.exports.aboutPage = (req, res) => {
    res.render("./event/about.ejs");
}

//get new event form controller
module.exports.getNewEventForm =  (req, res) => {
    res.render("./event/new.ejs");
}

//show an event controller
module.exports.showEvent = async (req, res) => {
    const {id} = req.params;
    const event = await Event.findById(id).populate("owner");
    if(!event) {
        req.flash("error", "Event dosent exist");
        return res.redirect("/events");
    }
    res.render("./event/show.ejs", {event});
}

//create a new event cotroller
module.exports.createEvent = async (req, res) => {
    if(!req.body.event) {
        throw new CustomError(400,"Send valid data for the event");
    }
    const url = req.file.path;
    const newEvent = new Event({...req.body.event,owner : req.user._id}); 
    newEvent.image = url;
    await newEvent.save();
    req.flash("success", "Event Created");
    res.redirect("/events");
}

//get edit form controller
module.exports.getEditEventForm = async (req, res) => {
    const {id} = req.params;
    const event = await Event.findById(id);
    if(!event) {
        throw new CustomError(400,"Event dosent exist");
    }
    res.render("./event/edit.ejs", {event});
}

//update event controller
module.exports.updateEvent = async (req, res) => {
    const {id} = req.params;    
    const updatedEvent = req.body.event;
    if(req.file) {
        const url = req.file.path;
        updatedEvent.image = url;
    }
    await Event.findByIdAndUpdate(id,updatedEvent);
    req.flash("success", "Event Updated");
    res.redirect(`/events/${id}`);
}

//delete event controller
module.exports.deleteEvent = async (req, res) => {
    const {id} = req.params;
    await Event.findByIdAndDelete(id);
    await Booking.deleteMany({event : id});
    req.flash("success", "Event Deleted");
    res.redirect("/events");
}