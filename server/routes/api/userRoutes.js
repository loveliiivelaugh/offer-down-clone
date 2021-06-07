const express = require('express');
const router = express.Router();
const User = require('../../models/User');

//almost exactly same as productRoutes

router.get('/:id', async (req, res) => {
  try {
    //get your model
    const userData = await User.findOne({ id: req.params.id })

    //other logical code goes in here.

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }

});

router.get('/', (req, res) => {})

//createUser()
router.post('/', async ({ body }, res) => {

  console.log(body)

  const newUser = await User.create(body);

  newUser 
    ? res.status(200).json(newUser) 
    : res.status(500).json({ error: "Somethings wrong?!" });

});

//addLikedItem()
router.post('/likes/:id', async (req, res) => {

  console.log(body)

  const user = await User.find({ _id: req.params.id });

  console.log(user)

  const { title, price, id } = req.body;
  
  user.saved_items.push({
    name: title,
    price: price,
    product_id: id
  })

  console.log(user)

  user 
    ? res.status(200).json(user) 
    : res.status(500).json({ error: "Somethings wrong?!" });

});

router.put('/:id', (req, res) => {})

router.delete('/:id', (req, res) => {})

module.exports = router;