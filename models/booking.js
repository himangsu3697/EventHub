const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    User : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    event : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event",
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;

