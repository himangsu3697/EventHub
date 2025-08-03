if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const CustomError = require("./utils/customError.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const localStratige = require("passport-local");
const flash = require("connect-flash");
const eventRouter = require("./routes/event.js");
const UserRouter = require("./routes/User.js");
const bookingRouter = require("./routes/booking.js");
const User = require("./models/User.js");
const Booking = require("./models/booking.js");
const Razorpay = require("razorpay");
const fs = require('fs');
const mongoStore = require("connect-mongo");

//app setup
const app = express();
const port = 3000;

//setup ejs
app.set("view engine", "ejs");
app.set("/views", path.join(__dirname, "/views"));

//setup ejsMate
app.engine("ejs", ejsMate);

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());
app.use(flash());

//setup session store
const store = mongoStore.create({
    mongoUrl : process.env.ATLASDB_URL,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter : 24*3600,
});
store.on("error", () => {
    console.log("Error in mongo session store", err);
});
//setup session
const sessionOptions = {
    store : store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now()+7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        sameSite : "lax",
        httpOnly: true,
    }
}
app.use(session(sessionOptions));

//setup passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratige(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//database setup
async function main() {
    await mongoose.connect(process.env.ATLASDB_URL);
}

main().then(() => {
    console.log("connection successful");
}).catch((err) => {
    console.log(err);
});

//middleware to store locals
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.User = req.User;
    next();
});

//razorpay setup
const razorpay = new Razorpay({
    key_id: process.env.RP_KEY,
    key_secret: process.env.RP_SECRET,
});

const crypto = require('crypto'); // For signature verification
const wrapAsync = require("./utils/wrapAsync.js");

// Function to validate webhook signature
const validateWebHookSignature = (body, signature, secret) => {
    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(body)
        .digest('hex');
    return expectedSignature === signature;
};

// Function to read data from JSON file
const readData = () => {
    try {
        if (fs.existsSync('orders.json')) {
            const data = fs.readFileSync('orders.json', 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Error reading orders file:', error);
        return [];
    }
};

// Function to write data to JSON file
const writeData = (data) => {
    try {
        fs.writeFileSync('orders.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing orders file:', error);
    }
};

// Initialize orders.json if it doesn't exist
if (!fs.existsSync('orders.json')) {
    writeData([]);
}

// Route to handle order creation
app.post("/create-order", wrapAsync(async (req, res) => {
    try {
        const { amount, currency, receipt, notes } = req.body;

        if (!amount || !currency || !receipt) {
            return res.status(400).send('Missing required fields');
        }

        const options = {
            amount: amount, // Convert amount to paise
            currency: currency,
            receipt: receipt,
            notes: notes || {},
        };

        const order = await razorpay.orders.create(options);

        // Read current orders, add new order, and write back to the file
        const orders = readData();
        orders.push({
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            status: 'created',
            created_at: new Date().toISOString()
        });

        writeData(orders);
        res.json(order);
    } catch (error) {
        res.status(500);
        throw error;
    }
}));


// Route to handle payment verification
app.post('/verify-payment', wrapAsync(async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ status: 'missing_parameters' });
        }

        const secret = process.env.RP_SECRET;
        if (!secret) {
            return res.status(500).json({ status: 'server_error', message: 'Server configuration error' });
        }

        const body = `${razorpay_order_id}|${razorpay_payment_id}`;
        const isValidSignature = validateWebHookSignature(body, razorpay_signature, secret);

        if (!isValidSignature) {
            return res.status(400).json({ status: 'verification_failed' });
        }

        // Update the order with payment details
        const orders = readData();
        const orderIndex = orders.findIndex(o => o.order_id === razorpay_order_id);

        if (orderIndex === -1) {
            return res.status(404).json({ status: 'order_not_found' });
        }

        orders[orderIndex].status = 'paid';
        orders[orderIndex].payment_id = razorpay_payment_id;
        orders[orderIndex].paid_at = new Date().toISOString();

        writeData(orders);
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error verifying payment' });
        throw error;
    }
}));

//payment success route
app.get("/payment-success", wrapAsync(async(req, res) => {
    const {uid, eid} =  req.session;
    const newBooking = new Booking({User : uid, event : eid});
    const User = await User.findById(uid);
    User.bookings.push(newBooking);
    await newBooking.save();
    await User.save();
    req.flash("success", "Event Booked Successfully");
    res.redirect("/events");
}));

//router middlewares
app.use("/events/bookings", bookingRouter);
app.use("/events", eventRouter);
app.use("/events/Users", UserRouter);

//route for request send in invalide path
app.use((req, res) => {
    throw new CustomError(404, "Page Note Found!");
});

//error handling middleware
app.use((err, req, res, next) => {
    const { status = 500, message = "Somthing went wrong" } = err;
    res.status(status).render("./event/error.ejs", { status, message });
});

//create server
app.listen(port, () => {
    console.log(`App is listning at the port : ${port}`);
});




