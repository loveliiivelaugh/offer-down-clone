const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class User extends Model{}

User.init( 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        street_address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        inbox: {
            type: DataTypes.ARRAY, //?????
            allowNull: false
        },
        saved_items: {
            type: DataTypes.ARRAY,
            allowNull: true
        },
        purchases: {
            type: DataTypes.ARRAY,
            allowNull: true
        },
        sales: {
            type: DataTypes.ARRAY,
            allowNull: true
        }
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product',
    }
);

module.exports = User;