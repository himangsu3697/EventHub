const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin } = require("../utils/middleware.js");
const { getPaymentOption, showAllBookings, showBooking, deleteBooking } = require("../controllers/booking.js");

//get payment option route
router.get("/:eid/:uid" ,isLoggedin ,wrapAsync(getPaymentOption));

//route to show all booked events of the User
router.get("/showAllBookings" ,isLoggedin ,wrapAsync(showAllBookings));

//route to show an individuaal event
router.get("/:id" ,isLoggedin ,wrapAsync(showBooking));

//route to delete a booking 
router.delete("/:bid/:uid" ,isLoggedin ,wrapAsync(deleteBooking));

module.exports = router;