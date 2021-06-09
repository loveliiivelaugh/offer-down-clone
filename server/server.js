const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const axios = require('axios');
const mongoose = require("mongoose");
require("dotenv").config();

// const User = require('./models/user.js');
// const Product = require('./models/product.js');

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

//Mongoose //process.env.MONGODB_URI
mongoose.connect("mongodb+srv://admin:gTDac4bsajEGLo1U@cluster0.ocuqj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || "mongodb://localhost/offerDown", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  // useFindAndModify: false //idk what this is doing but i think its messing me up.
});

//check dev or production environment
if ( process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//todo --> figure out why all these routes arent working through the router and fix 😑
//fakestoreapi -- GET dummyProducts route 
app.get('/api/products', (req, res) => {

  
  axios
    .get("https://fakestoreapi.com/products")
    .then(({ data }) => res.status(200).json(data))
    .catch(error => {
      console.error(error);
      res.json({ error: error });
    });
});





// //removeLikedItem() //! BROKEN -- needs to be fixed
// app.delete('/api/users/likes/:id', async (req, res) => {
//   //the following line should be able to find just the user thats currently logged in
//   //theres a better way to do this
//   const doc = await User.find({});

//   console.log(doc);

//   const itemToDelete = await doc[0].saved_items.forEach(item => {
//     if (item.product_id === req.params.id) {

//       console.log(item);

//       const indexOfItemToDelete = doc[0].saved_items.indexOf(item);
      
//       console.log("index", indexOfItemToDelete);

//       doc[0].saved_items.splice(indexOfItemToDelete, 1);
//     }
//     console.log(doc[0].saved_items);
//   });
  
//   await doc[0].save();
//   console.log(doc[0].saved_items);
//   console.log(itemToDelete);

//   doc[0] 
//     ? res.status(200).json(doc[0]) 
//     : res.status(500).json({ error: "Somethings wrong?!" });
// });


//server routes
app.use('/', routes); //🔀

app.listen(port, () => {
  console.log(`OfferDown application listening at http://localhost:${port}`);
});