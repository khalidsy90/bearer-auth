'use strict';

const Users = require('../models/users-model');
const base64 = require('base-64');

module.exports= async (req, res, next)=> {

  const encodedHeaders = req.headers.authorization.split(' ')[1]; 
  const [username, password] = base64.decode(encodedHeaders).split(':'); 
  console.log(username , password);

await Users.authenticateBasic(username, password).then(validUser => { 
    req.user = validUser;
    next();
}).catch(e => res.status(403).send("Invalid Login"))
}
