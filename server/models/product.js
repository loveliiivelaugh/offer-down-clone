const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
    name: {
        type: String,
        // required: 'Product name is required'
    },
    description: {
        type: String,
    },
    price: {
        type: Number, 
        // required: 'Price is required'
    },
    image: {
        type: String,
        // required: 'An image is required'
    },
    zip_code: {
        type: Number, 
        // required: 'Zip code is required'
    },
    user_id: {
        type: String
    },
    offers: [
        {
            amount: {
                type: Number,
                // required: 'A bid is required'
            } ,
            bidder_id: {
                type: String
            }
        }
    ]
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;