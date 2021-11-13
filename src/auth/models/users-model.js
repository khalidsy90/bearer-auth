'use strict';
require('dotenv').config();
const { sequelize, DataTypes } = require('./index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.VIRTUAL,
    get() {
      return jwt.sign({ username: this.username },process.env.API_SECRET);
    }}
});


Users.authenticateBasic = async function (username, password) {
    console.log('authenticateBasic function');
    console.log('check username ',username);
    const user = await Users.findOne({ where: { username:username } }); 
    console.log('user ',user.username , 'password ',user.password);
    const valid = await bcrypt.compare(password, user.password);
    console.log('---end------');
    if (valid) {

      let newToken = jwt.sign({ username: user.username },process.env.API_SECRET,{expiresIn:'1h'});
      user.token = newToken;
      return user;
    } else {
      throw new Error('Invalid User');
    }    
  }

  Users.authenticateBearer = async function (token) {
    const parsedToken = jwt.verify(token, process.env.API_SECRET);
    const user = await this.findOne({ where: { username: parsedToken.username } });
    if (user.username) {
      return user;
    } else {
      throw new Error('Invalid Token');
    }  
  }
  
  module.exports =Users ;

  