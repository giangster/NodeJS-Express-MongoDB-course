const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

//Connect to Mongoose
mongoose
  .connect("mongodb://localhost/vidjot-dev", {
    useMongoClient: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//Load Idea Model
require("./models/Idea");
const Idea = mongoose.model("ideas");

//Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Method Override Middleware
app.use(methodOverride("_method"));

//Express session middleware
app.use(
  session({
    secret: "hyhythecat",
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());

//Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Index Route
app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", { title });
});

//About Route
app.get("/about", (req, res) => {
  res.render("about");
});

//User login route
app.get("/users/login", (req, res) => {
  res.send("login");
});

//User register route
app.get("/users/register", (req, res) => {
  res.send("login");
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
