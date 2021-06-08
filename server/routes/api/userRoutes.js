const express = require('express');
const router = express.Router();
const User = require('../../models/User');


// @method: GET /api/users/:id
// @descr: Return select user by id
// @API getUser()
router.get('/:id', async (req, res) => {
  try {
    //get your model
    const userData = await User.findOne({ id: req.params.id })

    //return a rersponse code and json object.
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }

});

// @method: GET /api/users/:id
// @descr: Return all the users in database
// @API: getUsers()
router.get('/', (req, res) => {});

//createUser()
router.post('/', async ({ body }, res) => {

  console.log(body);

  const newUser = await User.create(body);

  newUser 
    ? res.status(200).json(newUser) 
    : res.status(500).json({ error: "Somethings wrong?!" });

});


// @method: POST /api/users/:id
// @descr: Return all the users in database
// @API addLikedItem()
router.post('/likes/:id', async (req, res) => {

  console.log(body);

  const user = await User.find({ _id: req.params.id });

  console.log(user);

  const { title, price, id } = req.body;
  
  user.saved_items.push({
    name: title,
    price: price,
    product_id: id
  })

  console.log(user);

  user 
    ? res.status(200).json(user) 
    : res.status(500).json({ error: "Somethings wrong?!" });

});

// @method: UPDATE /api/users/:id
// @descr: Update a user by id
// @API updateUser()
router.put('/:id', (req, res) => {});

// @method: DELETE /api/users/:id
// @descr: Delete a user by id from the database
// @API deleteUser()
router.delete('/:id', (req, res) => {});

module.exports = router;