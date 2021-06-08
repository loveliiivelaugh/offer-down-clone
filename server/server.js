const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require('./routes');

const app = express();

const port = process.env.PORT || 8080;

//server mmiddleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

//static resources
app.use(express.static('public'));

//Mongoose //move this to a connectDb() function
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/offerDown", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  // useFindAndModify: false //idk what this is doing but i think its messing me up.
});

//check dev or production environment
if ( process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//server routes
app.use(routes); //🔀 //import routes 🔀 

app.listen(port, () => {
  console.log(`OfferDown application listening at http://localhost:${port}`);
});