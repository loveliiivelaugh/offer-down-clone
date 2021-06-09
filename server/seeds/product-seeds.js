const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('../models');
const User = require('../models/User');

//connection string needs to go in .env
mongoose.connect("mongodb+srv://admin:gTDac4bsajEGLo1U@cluster0.ocuqj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || "mongodb://localhost/offerDown", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});


const fetchDummyProducts = async () => {
  return await axios.get("https://fakestoreapi.com/products")
    .then(data => {
      console.log(data.data)
      return data.data;
    })
    .catch(error => console.error(error));
};

const fetchDummyUsers = async () => {
  return await axios.get("https://randomuser.me/api/?results=5")
    .then(data => {
      console.log(data.data)
      return data.data;
    })
    .catch(error => console.error(error));
};

const handleSeeds = async () => {
  const sellers = [];

  const users = await fetchDummyUsers();

  console.log(users)

  // users.forEach(async user => {

  //   const items = await fetchDummyProducts();

  //   sellers.push({
  //     user: user,
  //     items: items
  //   });
  // });

  // return sellers;
};

//should write a middle function that adds a house or dummy user to our Products being added so they can initialize/seed with a product owner...ready to test messaging, offers, and any other user to user interactions.

// const seed = handleSeeds();

// console.log("Seed", seed);

// User.insertMany(seed)
//   .then((data) => {
//     console.log(data.result.n + ' records inserted!');
//     process.exit(0);
//   })
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
