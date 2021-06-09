const express = require('express');
const router = express.Router();

// const router = express.Router();
router.get('/', async (req, res) => {
  res.json({ message: "Success" });
})

// // @method: GET /api/users/:id
// // @descr: Return select user by id
// // @API getUser()
// router.get('/:id', async (req, res) => {
//   try {
//     //get your model

//     const userData = await User.find({})
//     console.log(userData)

//     //return a rersponse code and json object.
//     res.status(200).json(userData[0]);
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }

// });

// // @method: GET /api/users/:id
// // @descr: Return all the users in database
// // @API: getUsers()
// router.get('/', (req, res) => {});
// // Get one user
// router.get('/:id', async (req, res) => {
//   try {
//     const userData = await User.findOne({ id: req.params.id });

//     res.status(200).json(userData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }

// });

// // get all users
// router.get('/', async (req, res) => {
//   try {
//     const userData = await User.findAll({});

//     res.status(200).json(userData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }
// });

// //createUser()
// router.post('/', async ({ body }, res) => {
//   try {
//     const newUser = await User.create(body);

//     console.log(body);

//     newUser 
//       ? res.status(200).json(newUser) 
//       : res.status(500).json({ error: "Somethings wrong?!" });
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }

// });


// // @method: POST /api/likes/:id
// // @descr: Return the current logged in users saved items
// // @API addLikedItem()
// router.post('/likes/:id', async ({ body }, res) => {
//   try {
//     const user = await User.find({});

//     console.log(body);

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }
// });

// //addLikedItem()
// //On the front end, we also send the id of the current user along with this post request
// router.post('/likes/:id', async (req, res) => {
//   try {
//     const product = await Product.find({ _id: req.params.id });
//     const user = await User.findOne({ id: req.body.user });

//     user.saved_items.push(product);

//     const updatedUser = await User.updateOne({ id: req.body.user }, { user });

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }

// });

// router.put('/:id', async (req, res) => {
//   console.log(req.body);
//   try {
//     const userData = await User.updateOne({ id: req.params.id }, req.body); // talk with team

//     res.status(200).json(userData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   };

// });

// router.delete('/:id', async (req, res) => { 
//   try {
//     const userData = await User.remove({ id: req.params.id });

//     res.status(200).json(userData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }
// });

module.exports = router;