const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/User');

//connection string needs to go in .env
mongoose.connect("mongodb+srv://admin:gTDac4bsajEGLo1U@cluster0.ocuqj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || "mongodb://localhost/offerDown", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});


const fetchDummyProducts = async () => {
  return await axios.get("https://fakestoreapi.com/products")
    .then(data => data.data)
    .catch(error => console.error(error));
};

const fetchDummyUsers = async () => {
  return await axios.get("https://randomuser.me/api/?results=20")
    .then(data => data.data)
    .catch(error => console.error(error));
};

const handleSeeds = async () => {
  const sellers = [];

  const users = await fetchDummyUsers();
  const items = await fetchDummyProducts();

  users.results.forEach(async user => {

    items.forEach(item => item.seller_id = user.login.uuid);

    sellers.push({
      name: user.name.first + " " + user.name.last,
      email: user.email,
      street_address: user.location.street.number + " " + user.location.street.name,
      city: user.location.city,
      state: user.location.state,
      zip_code: user.location.postcode,
      username: user.login.username,
      password: user.login.password,
      posted_items: items
    });
  });
  
  sellers.forEach(seller => {
    User.create(seller)
      .then((data) => {
        console.log(data, ' record inserted!');
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

handleSeeds();