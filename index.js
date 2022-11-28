const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const scoreboardRouts = require("./api/routes/scoreboard");
const resultsRouts = require("./api/routes/result");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("dotenv").config();
mongoose
  .connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })
  .then(console.log("connected"))
  .catch((err) => {
    console.log("xxxxxxxxxxxxxxxxxx");
    console.log(err);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(scoreboardRouts);
app.use(resultsRouts);

app.listen(3000);
