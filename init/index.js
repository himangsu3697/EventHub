const mongoose =  require("mongoose");
const Event = require("../models/event.js");
const data = require("./data.js");

//database setup
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/major_project_2");
}
main().then(() => {
    console.log("connection successful");
}).catch((err) => {
    console.log(err);
});

async function initData() {
    await Event.deleteMany({});
    for(d of data) {
        await Event.insertOne({...d,owner : "6884da014528530b0b8477b5"});
    }
    console.log("data initilized successfully..");
}

initData()


