const express = require('express');
const router = express.Router();
const User = require('../../models/User.js');

/**
 * @method POST /api/users/offers
 * @descr Send an offer from one user to another user
 * @API submitOffer()
 */
router.post('/offer', async ({ body }, res) => {

  try {

    User.findById(body.recepient.user_id, (err, doc) => {
      if (err) throw err;

      doc.notifications.push({
        type: "offer",
        amount: body.offer.amount,
        recipient_id: body.recepient.user_id,
        sender_id: body.sender.data.uid
      });

      doc.save();

      res.status(200).json(doc);

    });
  } catch (error) {

    res.status(500).json({ errorMessage: error });

  }
});

router.delete('/offer/:id/:user', async (req, res) => {

    const updatedUser = await User.findByIdAndUpdate(req.params.user,
      {$pull: {notifications: {_id:req.params.id}}}, {new:true});

    res.status(200).json(updatedUser);

})

router.get('/notifications/:id'), async (req,res) => {

  const user = await User.find({firebase_uid:req.params._id});

  res.status(200).json(user.notifications);
}

/**
 * @method POST /api/likes
 * @descr Return the current logged in users saved items -- On the front end, we also send the id of the current user along with this post request
 * @API addLikedItem()
 */
router.post('/likes', async ({ body }, res) => {

  try {

    User.findById(body.user._id, (err, doc) => {
      if (err) throw err;

      if (!doc.saved_items.includes(body.item)) {
        doc.saved_items.push(body.item);

        doc.save();

        res.status(200).json(doc);

      } else {

        res.status(200).end();
      }
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
router.delete('/likes/:user_id/:id', async (req, res) => {
  
  try {
    
    const updatedUser = await User.findByIdAndUpdate(req.params.user_id, 
      {$pull: {saved_items: {_id:req.params.id}}}, {new:true});

    res.status(200).json(updatedUser);

  } catch (error) {

    res.status(500).json({ errorMessage: error });

  }
});

/**
 * @method POST /api/users/messages
 * @descr Post a message to another user's inbox
 * @API sendMessage()
 */
router.post('/message', async ({ body }, res) => {

  const { sender, recepient, message } = body;

  try {

    const userToUpdate = await User.findById(recepient.user_id);
    // const updatedUser = await User.findByIdAndUpdate(recepient.user_id, {$push: {messages: {
    //   type: "message",
    //   content: message,
    //   recepient_id: recepient.user_id,
    //   sender_id: sender.data._id
    // }}}, (err, res) => {
    //   console.log(res);
    // });
    //come back to this
    userToUpdate.messages.push({
      type: "message",
      content: message.message,
      recipient_id: recepient.user_id,
      sender_id: sender.data._id
    });

    userToUpdate.save();

    res.status(200).json(userToUpdate);

  } catch (error) {

    res.status(500).json({ errorMessage: error });

  }
});

// // updateUser()
// router.put('/:id', async (req, res) => {
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

/**
 * @method GET /api/users/:id
 * @descr Return select user by id
 * @API getUser()
 */
router.get('/:id', async ({ params }, res) => {

  //get your users from your User model
  // User.find({ _id: params.id })
  User.find({})
    .then(response => {
      
      const user = response.filter(user => user._id == params.id);

      if (user) {
        res.status(200).json(user);
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

  try {

    const userData = await User.find({});

    const user = userData.filter(user => user.firebase_uid == query);

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

  const { first, last, email, providerData, uid, lastLoginAt, createdAt } = body;

  try {
    const newUser = await User.create({ 
      first_name: first,
      last_name: last,
      email: email, 
      password: providerData[0].providerId,
      firebase_uid: uid 
    });

    const appendedAuthObject = Object.assign(newUser, body);

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