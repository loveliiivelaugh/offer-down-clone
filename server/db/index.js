const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = () => {
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/offerDown", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // useFindAndModify: false //idk what this is doing but i think its messing me up.
  });
};

module.exports = connectDatabase();