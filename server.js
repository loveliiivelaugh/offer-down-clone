const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const connectDatabase = require('./server/db');
const routes = require('./server/routes');
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/offerDown", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});


const app = express();

const port = process.env.PORT || 8080;

//server mmiddleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors());

//static resources
app.use(express.static('public'));

// connectDatabase();

//check dev or production environment
if ( process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// 🔀  server routes 🔀 
app.use(routes);

app.listen(port, () => {
  console.log(`OfferDown application listening at http://localhost:${port}`);
});

module.exports = app;