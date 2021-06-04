const Product = require('./product');
const Category = require('./category');
const User = require('./user');

Product.belongsTo(Category, {
    foreignKey: 'category_id'
});

module.exports = {
    Product,
    Category,
    User,
};
