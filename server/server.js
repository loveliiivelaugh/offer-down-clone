const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const axios = require('axios');
const mongoose = require("mongoose");
require("dotenv").config();

const User = require('./models/User.js');

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
  useFindAndModify: false
});

//check dev or production environment
if ( process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//todo --> figure out why all these routes arent working through the router and fix 😑
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


const client = require('./controller/plaid.js');
PLAID_REDIRECT_URI="http://localhost:3000/";
// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#create-link-token
app.post('/api/plaid/create_link_token', ({ body }, response, next) => {
  console.log("This token route is being tapped.", body.id)
  const configs = {
    'user': {
      // This should correspond to a unique id for the current user.
      'client_user_id': 'user-id',
    },
    'client_name': "Plaid Quickstart",
    'products': ["auth"],
    'country_codes': ['US'],
    'language': "en",
  };

  if (PLAID_REDIRECT_URI !== '') {
    configs.redirect_uri = PLAID_REDIRECT_URI;
  }
  
  client.createLinkToken(configs, (error, createTokenResponse) => {
      if (error != null) {
        console.log(error);
        return response.json({
          error: error,
        });
      }
      response.json(createTokenResponse);
  });
});

app.post('/api/plaid/exchange_public_token', async (request, response) => {
  try {
    const publicToken = request.body.public_token;
    // Exchange the client-side public_token for a server access_token
    const tokenResponse = await client.exchangePublicToken(publicToken);
    // Save the access_token and item_id to a persistent database
    const accessToken = tokenResponse.access_token;
    const itemId = tokenResponse.item_id;


    const authenticatedPlaidUser = await User.findOneAndUpdate({ _id: request.body.user_id }, {
      plaid_accessToken: accessToken,
      plaid_itemId: itemId
    }, (err, res) => {
      console.log(res, err);
    
      err
        ? res.status(500).json({ error: err })
        : res.status(200).json(res);
    })

  } catch (e) {
    // Display error on client
    return response.send({ error: e.message });
  }
});

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


//server routes
app.use('/', routes); //🔀

app.listen(port, () => {
  console.log(`OfferDown application listening at http://localhost:${port}`);
});