//PeakPartner app.js (MAIN SERVER/APP PAGE)
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
dotenv.config();
const ejs = require("ejs");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");

//Models
const User = require("./models/user");
const Campground = require("./models/campground");

//Middleware
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

//Route Requirements
const campgroundRoutes = require("./routes/campgrounds");
const userRoutes = require("./routes/users");
const reviewRoutes = require("./routes/reviews");

//Controllers
const authController = require("./controllers/auth.js");
const recipesController = require("./controllers/recipes.js");
const ingredientsController = require("./controllers/ingredients.js");

//Routes
app.use(passUserToView);
app.use("/auth", authController);
app.use(isSignedIn);
app.use("/recipes", recipesController);
app.use("/ingredients", ingredientsController);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

//!!!!!!!!!!
const localDbUrl = "mongodb://localhost:27017/PeakPartner";

/** MongoDB Database Setup */
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
	console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//Session Storing

//!!!!!!!!!!

app.use(
	session({
		store: MongoStore.create({ mongoUrl: "mongodb://localhost/PeakPartner" }),
	})
);

store.on("error", function (error) {
	console.log("MongoStore SESSION ERROR", error);
});

//Creating User Session
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

app.get("/", (req, res) => {
	console.log("GET app.js '/' (render index.ejs)");
	res.render("index.ejs", {
		user: req.session.user,
	});
});

app.get("/", (req, res) => {
	res.render("home.ejs");
});

//Port Listener
const port = process.env.PORT ? process.env.PORT : "3000";

app.listen(port, () => {
	console.log(`Express app listening on port ${port}`);
});
