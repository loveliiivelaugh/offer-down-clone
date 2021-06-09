const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const axios = require('axios');
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();

const port = process.env.PORT || 8080;
//import routes 🔀
const routes = require('./routes');

//server mmiddleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

//static resources
app.use(express.static('public'));

//Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/offerDown", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

//check dev or production environment
if ( process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//todo --> figure out why this isnt working in its own route 😑
//fakestoreapi -- GET dummyProducts route 
app.get('/api/products', (req, res) => {
  axios.get("https://fakestoreapi.com/products")
    .then(data => {
      console.log(data.data);
      res.json(data.data);
    })
    .catch(error => {
      console.error(error);
      res.json({ error: error });
    });
});

//server routes
app.use(routes); //🔀

app.listen(port, () => {
  console.log(`OfferDown application listening at http://localhost:${port}`);
});