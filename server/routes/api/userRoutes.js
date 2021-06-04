const express = require('express');
const router = express.Router();
const User = require('../../../models/User');

//almost exactly same as productRoutes

router.get('/users/:id', async (req, res) => {
  //get your model
  const userData = await User.findOne({ id: req.params.id })

  //convert it and add any associated models in your response
  const user = userData.find({ plain: true });

  //other logical code goes in here.

  res.status(200).json(user);

})

router.get('/users', (req, res) => {})

router.post('/users/:id', (req, res) => {})

router.put('/users/:id', (req, res) => {})

router.delete('/users/:id', (req, res) => {})

module.exports = router;