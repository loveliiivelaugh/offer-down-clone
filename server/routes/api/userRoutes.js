const express = require('express');
const router = express.Router();
const User = require('../../models/User.js');
// const Product = require('../../models/product.js');


// // getUser()
// router.get('/:id', async (req, res) => {
//   try {
//     const userData = await User.findOne({ id: req.params.id });

//     res.status(200).json(userData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }

// });

// // getUsers()
// router.get('/', async (req, res) => {
//   try {
//     const userData = await User.findAll({});

//     res.status(200).json(userData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }
// });

// // createUser()
// router.post('/', async ({ body }, res) => {
//   try {
//     const newUser = await User.create(body);

//     res.status(200).json(newUser);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }
// });


/**
 * @method POST /api/likes
 * @descr Return the current logged in users saved items -- On the front end, we also send the id of the current user along with this post request
 * @API addLikedItem()
 */
router.post('/likes', async ({ body }, res) => {
  console.log(body);
  
  try {
    User.findById(body.user._id, (err, doc) => {
      if (err) throw err;
      doc.saved_items.push(body.item);

      doc.save();

      console.log(doc);

      res.status(200).json(doc);
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
});

/**
 * @method DELETE /api/likes/:id
 * @descr Delete a saved item from the users saved_items array
 * @API removeLikedItem()
 */
router.delete('/likes/:user/:id', async ({ params }, res) => {
  console.log(params);
  
  try {
    User.findById(params.user._id, (err, doc) => {
      if (err) throw err;
      
      console.log(doc);

      const itemToBeDeleted = doc.liked_items.forEach(item => {
        if (item._id == params.id) {
          return item;
        }
      });

      console.log(itemToBeDeleted);

      const index = doc.liked_items.indexOf({ _id: itemToBeDeleted.id });

      const updatedLikedItems = doc.liked_items.splice(index, 1);

      console.log(updatedLikedItems);

      doc.save();

      res.status(200).json(doc);
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
});

// // updateUser()
// router.put('/:id', async (req, res) => {
//   console.log(req.body);
//   try {
//     const userData = await User.updateOne({ id: req.params.id }, req.body); // talk with team

//     res.status(200).json(userData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   };

// });

// // deleteUser()
// router.delete('/:id', async (req, res) => { 
//   try {
//     const userData = await User.remove({ id: req.params.id });

//     res.status(200).json(userData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }
// });
// // const router = express.Router();
// router.get('/', async (req, res) => {
//   res.json({ message: "Success" });
// })

// @method: GET /api/users/:id
// @descr: Return select user by id
// @API getUser()
router.get('/:id', async ({ params }, res) => {

  console.log(params.id);
  //get your users from your User model
  // User.find({ _id: params.id })
  User.find({})
    .then(response => {
      console.log("User from User model.", response);
      
      const user = response.filter(user => user._id == params.id);

      console.log(user);

      if (user) {
        //return a response code and json object.
        res.status(200).json(response);
      }
    })
    .catch(error => res.status(500).json({ error: error }));
});

// @method: GET /api/users/:id
// @descr: Return a user in database by id or email
// @API: getUser()
// Get one user
router.get('/user/:query', async (req, res) => {
  const { query } = req.params;

  console.log(query)

  try {
    const userData = await User.find({});

    const user = userData.filter(user => user.firebase_uid == query);

    console.log(user, userData[0].email);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }

});

// // get all users
// router.get('/', async (req, res) => {
//   try {
//     const userData = await User.findAll({});

//     res.status(200).json(userData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }
// });

/**
 * @method createUser()
 * @descr Create a new user
 * @route POST /api/users
 */
router.post('/', async ({ body }, res) => {

  const { email, providerData, uid, lastLoginAt, createdAt } = body;

  console.log(body);


  try {
    const newUser = await User.create({ 
      email: email, 
      password: providerData[0].providerId,
      firebase_uid: uid 
    });

    // console.log(newUser);
    const appendedAuthObject = Object.assign(newUser, body);
    
    console.log(appendedAuthObject);

    newUser 
      ? res.status(200).json(appendedAuthObject) 
      : res.status(500).json({ error: "Somethings wrong?!" });
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }

});

// router.delete('/:id', async (req, res) => { 
//   try {
//     const userData = await User.remove({ id: req.params.id });

//     res.status(200).json(userData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }
// });

module.exports = router;