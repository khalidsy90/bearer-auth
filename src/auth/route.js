'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
// const base64 = require('base-64');
const Users = require('./models/users-model');
const basicAuth = require('./middleware/basic')
const router = express.Router();
const bearer= require('./middleware/basic')
router.use(express.urlencoded({ extended: true }));

router.post('/signup', async (req, res) => {
    try {
      // hash the password within the req body
      req.body.password = await bcrypt.hash(req.body.password, 5);
      // create the new user Record 
      const record = await Users.create(req.body);
      let data={
        user:record,
        token:record.token
      }
      res.status(201).json(data);
    } catch (error) {
      res.status(403).send("Error occurred");
    }
  });
  
  router.post('/signin', basicAuth, async (req, res) => {
    let data={
      user:req.user,
      token:req.user.token
    }
    res.status(200).json(data);
  });

  router.get('/getuser',async(req, res)=>{
      const user= await Users.findOne({where:{username:"khalid"}})
      res.status(200).json(user)
  });

  router.get('/user', bearer,async(req, res) => {
    res.json({
      'message': 'You are authorized to view the user profile',
      'user': req.user
    });
  });
  
  module.exports = router;