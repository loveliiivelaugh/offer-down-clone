const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        // required: 'An email is required',
        // match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
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
        // validate: [({ length }) => length != 5, 'Please enter a valid zip code']
    },
    username: {
        type: String // Or from a list of options?
    },
    password: {
        type: String,
        // required: 'Password is required'
    },
    balance: {
        type: Number
    },
    payment_methods: [
        {
            card_number: {
                type: String,
                required: 'A valid card number is required'
            },
            expiration: {
                type: String,
                required: 'Expiration date is required'
            },
            security: {
                type: Number,
                required: 'Security code is required'
            }
        }
    ],
    plaid_accessToken: {
        type: String,
    },
    plaid_itemId: {
        type: String
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
    messages: [
        {
            type: {
                type: String,
            },
            content: {
                type: String
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
                type: String
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
    posted_items: [
        {
            id: {
                type: Number
            },
            title: {
                type: String
            },
            price: {
                type: Number
            },
            image: {
                type: String
            },
            seller_id: {
                type: String
            },
            category: {
                type: String
            },
            description: {
                type: String
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
    ],
    unique_id: {
        type: String
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;