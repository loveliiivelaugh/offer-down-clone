const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Product = require('../../models/product');

//almost exactly same as productRoutes

// Get one user
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({ id: req.params.id });

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }

});

// get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({});

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
});

//createUser()
router.post('/', async ({ body }, res) => {
  try {
    const newUser = await User.create(body);

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
});

//addLikedItem()
//On the front end, we also send the id of the current user along with this post request
router.post('/likes/:id', async (req, res) => {
  try {
    const product = await Product.find({ _id: req.params.id });
    const user = await User.findOne({ id: req.body.user });

    user.saved_items.push(product);

    const updatedUser = await User.updateOne({ id: req.body.user }, { user });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }

});

router.put('/:id', (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.updateOne({ id: req.params.id }, req.body); // talk with team

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  };

});

router.delete('/:id', (req, res) => { 
  try {
    const userData = await User.remove({ id: req.params.id });

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
});

module.exports = router;