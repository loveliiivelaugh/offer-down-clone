const Product = require('./product');
const Category = require('./category');
const User = require('./user');

User.hasMany(Product, {
    foreignKey: 'user_id'
});

Product.belongsTo(User, {
    foreignKey: 'user_id'
});

// Prducts belongs to many categories
Product.belongsToMany(Category, {
    foreignKey: 'category_id'
});

// Category has many products
Category.belongsToMany(Product, {
    foreignKey: 'category_id'
});

module.exports = {
    Product,
    Category,
    User,
};