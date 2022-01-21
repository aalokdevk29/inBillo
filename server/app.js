var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
dotenv.config();

var app = express();
const routes = require("./routes");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to db")
);
mongoose.connection.on("error", function (err) {
  console.log("Error: Could not connect to MongoDB.");
});

app.use(routes);

app.listen(8000, () => {
  console.log("Server started!");
});
