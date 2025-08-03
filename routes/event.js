const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isOwner } = require("../utils/middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const uploade = multer({storage});
const { showAllEvents, aboutPage, getNewEventForm, showEvent, createEvent, getEditEventForm, updateEvent, deleteEvent} = require("../controllers/event.js");

//index route to shoe all events
router.get("/", wrapAsync(showAllEvents));
 
//route to get the new event form
router.get("/new",isLoggedin ,getNewEventForm);

//route to view about section
router.get("/about" ,aboutPage);

//show route to show a event
router.get("/:id", wrapAsync(showEvent));

//route to create a new event
router.post("/" ,isLoggedin, uploade.single("event[image]"), wrapAsync(createEvent));

//route to get the edit event form 
router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(getEditEventForm));

//route to update the event 
router.put("/:id" ,isLoggedin, isOwner, uploade.single("event[image]"), wrapAsync(updateEvent));

//route to delete a event 
router.delete("/:id" ,isLoggedin, isOwner, wrapAsync(deleteEvent));

module.exports = router;

