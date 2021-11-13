"use strict";

require("dotenv");

// const Users = require('./users-model');
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
console.log('this is database connection string',POSTGRES_URI);

const {Sequelize, DataTypes} = require('sequelize');

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  } : {};
const sequelize = new Sequelize(POSTGRES_URI,sequelizeOptions);

module.exports = {
    db: sequelize,
    sequelize:sequelize,     
    DataTypes:DataTypes,
    // users:Users(sequelize, DataTypes),    
}