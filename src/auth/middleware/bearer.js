'use strict';
const Users = require('../models/users-model');
module.exports=async (req, res, next) =>{
  console.log('------------');
  console.log(req.headers.authorization);
  const bearerHeaderToken = req.headers.authorization.split(' ')[1]; 
  await Users.authenticateBearer(bearerHeaderToken).then(userData => {
    req.user = userData;
    console.log(req.user);
    console.log(userData);
    next();
  }).catch(e => res.status(403).send('Invalid Login'));
}

