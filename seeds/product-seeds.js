const { Product } = require('../models');

const productData = [
    {
        product_name: 'Airpods',
        price: 200.00,
        stock: 3,
        category_id: 1,
    },
    {
        product_name: 'Airpods',
        price: 200.00,
        stock: 3,
        category_id: 1,
    },
    {
        product_name: 'Airpods',
        price: 200.00,
        stock: 3,
        category_id: 1,
    },
    {
        product_name: 'Airpods',
        price: 200.00,
        stock: 3,
        category_id: 1,
    },
    {
        product_name: 'Airpods',
        price: 200.00,
        stock: 3,
        category_id: 1,
    },
    {
        product_name: 'Airpods',
        price: 200.00,
        stock: 3,
        category_id: 1,
    },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;