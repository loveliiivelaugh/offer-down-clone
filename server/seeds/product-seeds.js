const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('../models');

//connection string needs to go in .env
mongoose.connect("mongodb+srv://admin:gTDac4bsajEGLo1U@cluster0.ocuqj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || "mongodb://localhost/offerDown", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//wrapping this axios call in an asynchronous function to be called when initialized
const fetchDummyProducts = async () => {
  return await axios.get("https://fakestoreapi.com/products")
    .then(data => data.data)
    .catch(error => console.error(error));
};

//should write a middle function that adds a house or dummy user to our Products being added so they can initialize/seed with a product owner...ready to test messaging, offers, and any other user to user interactions.

const productsSeed = fetchDummyProducts();

Product.deleteMany({})
  .then(() => Product.collection.insertMany(productsSeed))
  .then((data) => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
