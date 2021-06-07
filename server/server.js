const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const axios = require('axios');
const mongoose = require("mongoose");
require("dotenv").config();

const User = require('./models/User.js');
const Product = require('./models/User.js');

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


// getUser()
app.get('/api/users/:id', async (req, res) => {
  //get your model
  const userData = await User.find({})
  console.log(userData);

  //other logical code goes in here.

  res.status(200).json(userData);

})

//createUser()
app.post('/api/users', async ({ body }, res) => {

  console.log(body)

  const newUser = await User.create(body);

  newUser 
    ? res.status(200).json(newUser) 
    : res.status(500).json({ error: "Somethings wrong?!" });

});


//addLikedItem()
app.post('/api/users/likes', async ({ body }, res) => {
  //this function/route is very sloppy

  console.log(body)
  const { items, user } = body;

  //the following line should be able to find just the user thats currently logged in
  //theres a better way to do this
  const doc = await User.find({});

  console.log(doc);

  //gotta fix everywhere where its hard coded selecting the only user in the db at the moment through the array index...otherwise the rest is good.
  doc[0].saved_items.push({
    name: items.title,
    price: items.price,
    product_id: items.id
  })

  await doc[0].save();

  doc[0] 
    ? res.status(200).json(doc[0]) 
    : res.status(500).json({ error: "Somethings wrong?!" });

});


//removeLikedItem() //! BROKEN -- needs to be fixed
app.delete('/api/users/likes/:id', async (req, res) => {
  //the following line should be able to find just the user thats currently logged in
  //theres a better way to do this
  const doc = await User.find({});

  console.log(doc);

  const itemToDelete = await doc[0].saved_items.forEach(item => {
    if (item.product_id === req.params.id) {

      console.log(item);

      const indexOfItemToDelete = doc[0].saved_items.indexOf(item);
      
      console.log("index", indexOfItemToDelete);

      doc[0].saved_items.splice(indexOfItemToDelete, 1);
    }
    console.log(doc[0].saved_items);
  });
  
  await doc[0].save();
  console.log(doc[0].saved_items);
  console.log(itemToDelete);

  doc[0] 
    ? res.status(200).json(doc[0]) 
    : res.status(500).json({ error: "Somethings wrong?!" });
});

// addProduct()
app.post('/api/products', async (req, res) => {
  const { product, user } = req.body;

  // const newProduct = await Product.create(product); //this is definitely not right..

  console.log(product, user);

  //the following line should be able to find just the user thats currently logged in
  //theres a better way to do this
  const userData = await User.find({});

  // console.log(userData);

  const generateProductId = () => {
    //need to write this function. can also import and use the uuid library.
    return 12;
  };

  //gotta fix everywhere where its hard coded selecting the only user in the db at the moment through the array index...otherwise the rest is good.
  userData[0].posted_items.push({
    name: product.name,
    price: product.price,
    seller_id: user.id,
    product_id: generateProductId()
  })

  await userData[0].save();

  

  userData[0] 
    ? res.status(200).json({ status: "success", userData }) 
    : res.status(500).json({ error: "Somethings wrong?!" });
});

//server routes
app.use('/', routes); //🔀

app.listen(port, () => {
  console.log(`OfferDown application listening at http://localhost:${port}`);
});