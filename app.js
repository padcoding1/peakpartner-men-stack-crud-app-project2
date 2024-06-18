//PeakPartner app.js (MAIN SERVER/APP PAGE)

//Modules
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

//Middleware
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

//Models (exported from index.js, which pulls from model files (expedition.js, user.js))
const Model = require("./models/index.js");

//Routes (Remember that middleware will run before the route, WATCH ORDER)
const guestRoutes = require("./routes/guest-routes.js");
const userRoutes = require("./routes/user-routes.js");
const expeditionRoutes = require("./routes/expedition-routes.js");

//Controllers
const guestController = require("./controllers/guest-controller.js"); //Using a Controller instead of Routes
const userController = require("./controllers/user-controller.js");
const teamController = require("./controllers/user-controller.js");
const expeditionController = require("./controllers/expedition-controller.js");
//Creating User Session with express-session and Storing with MongoStore/connect-mongo
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: true,
		resave: false,
		store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
	})
);

//Routes
app.use("/guest", guestRoutes);
app.use(passUserToView);
app.use("/team", teamRoutes);
app.use("/expedition", expeditionRoutes);
app.use("/user", userRoutes);
app.use(isSignedIn);
// app.use("/exmple/:id/reviews", reviewRoutes);

//MongoDB Database Setup
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
	console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//Port Listener
const port = process.env.PORT ? process.env.PORT : "3000";

app.listen(port, () => {
	console.log(`Express app listening on port ${port}`);
});
