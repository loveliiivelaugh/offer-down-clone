const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: 'Username is required'
    },
    email: {
        type: String,
        required: 'An email is required',
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    street_address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String // Or from a list of options?
    },
    zip_code: {
        type: Number,
        required: 'Zip code is required',
        validate: [({ length }) => length != 5, 'Please enter a valid zip code']
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    notifications: [
        {
            type: {
                type: String,
            },
            content: {
                type: String
            },
            amount: {
                type: Number
            },
            recipient_id: {
                type: String
            },
            sender_id: {
                type: String
            },
            dateCreated: {
                type: Date,
                default: Date.now
            }
        }
    ],
    saved_items: [
        {
            name: {
                type: String
            },
            price: {
                type: Number
            },
            product_id: {
                type: Schema.ObjectId
            }
        }
    ],
    purchased_items: [
        {
            name: {
                type: String
            },
            price: {
                type: Number
            },
            product_id: {
                type: Schema.ObjectId
            }
        }
    ],
    sold_items: [
        {
            name: {
                type: String
            },
            price: {
                type: Number
            },
            buyer_id: {
                type: Schema.ObjectId
            },
            product_id: {
                type: Schema.ObjectId
            }
        }
    ]

});

const User = mongoose.model('User', UserSchema);

module.exports = User;