const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [ true, "Title is required"],
    },
    description : {
        type : String,
        required : [ true, "Description is required"],
    },
    image : {
        type : String,
    },
    price : {
        type : Number,
        required : [ true, "Price is required"],
        min : 0,
    },
    date : {
        type : Date,
        required : [ true, "Date is required"]
    },
    venue : {
        type : String,
        required : [ true, "Venue is required"]
    },
    capacity : {
        type : Number,
        required : [ true, "Capacity is required"],
        min : 0,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

