const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');


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

  //use uuid library to generate a truly unique id -- 
  //set it to a variable so we can use the same one more than once in this loop
  const uuid = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

    //for each item belonging to the user assign a new attr to that item with the same uuid
    items.forEach(item => item.seller_id = uuid);

    sellers.push({
      name: user.name.first + " " + user.name.last,
      email: user.email,
      street_address: user.location.street.number + " " + user.location.street.name,
      city: user.location.city,
      state: user.location.state,
      zip_code: user.location.postcode,
      username: user.login.username,
      password: user.login.password,
      unique_id: uuid,
      posted_items: items
    });
  });
  
  sellers.forEach(seller => {
    User.create(seller)
      .then(({ unique_id }) => {
        console.log(unique_id, ' record inserted!');
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

handleSeeds();