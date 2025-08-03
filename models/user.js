const mongoose = require("mongoose");
const PasportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    bookings : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "Booking"
    }
},{ collection: "ehubuser" });

UserSchema.plugin(PasportLocalMongoose);
const User = mongoose.model("User",UserSchema);
module.exports = User;

