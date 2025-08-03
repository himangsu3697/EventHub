const mongoose = require("mongoose");
const PasportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    bookings : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "Booking"
    }
},{ collection: "ehubuser" });

userSchema.plugin(PasportLocalMongoose);
const User = mongoose.model("User",userSchema);
module.exports = User;

