const express = require("express");

const cookieParser = require("cookie-parser");

const path = require("path");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const { connectToMongoDb } = require("./connect");

const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");

const app = express();
const PORT = 8000;

// connection
connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDb connected!")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// built-in middleware
app.use(express.json()); // parses incoming JSON payloads & makes them available in req.body object.

app.use(express.urlencoded({ extended: false })); // parses incoming URL-encoded form data (from HTML forms or similar sources) & makes it available in the req.body object.

app.use(cookieParser());

// routes
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server started at ${PORT}!`));
