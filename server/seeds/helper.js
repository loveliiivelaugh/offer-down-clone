const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');


//connection string needs to go in .env
mongoose.connect("mongodb+srv://admin:gTDac4bsajEGLo1U@cluster0.ocuqj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || "mongodb://localhost/offerDown", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//@DESCR: This helper function takes all the items posted by users and adds them as their own product collection seperate from the user collection that posted them.
const helper = async () => {
  try {
    const users = await User.find({});

    users.forEach(({ posted_items, zip_code }) => {

      posted_items.forEach(({ title, description, price, image }) => {
        Product.create({
          name: title,
          description: description,
          price: price,
          images: image,
          zip_code: zip_code,
          offers: []
        })
          .then(response => {
            console.log(response, " item created!");
          })
          .catch(error => console.error(error));
      });
    });
  } catch (error) {
    console.error(error);
  }
};

helper();