const { Category } = require('../models');

const categoryData = [
    {
        category_name: 'Electronics',
    },
    {
        category_name: 'Clothing',
    },
    {
        category_name: 'Pet supplies',
    },
    {
        category_name: 'Home and Garden',
    },
    {
        category_name: 'Baby and Kids',
    },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;