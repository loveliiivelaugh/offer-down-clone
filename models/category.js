const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class Category extends Model{}

Category.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            
        }
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product',
    }
)

module.exports = Category;