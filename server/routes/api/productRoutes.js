const express = require('express');
const router = express.Router();
const User = require('../../models/User');
// const axios = require('axios');


// @method -- GET
// @api -- getProducts()
// @descr --  Return all products posted in the database.
router.get('/', async (req, res) => {
  console.log("getProducts()");
  const totalItems = [];

  try {
    const users = await User.find({});

    users.forEach(({ posted_items }) => {
      posted_items.forEach(item => {
        totalItems.push(item);
      });
    });

    console.log(totalItems);
    res.status(200).json(totalItems);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


// router.get('/products/:id', async (req, res) => {
//   const product = await Product.findOne({ id: req.params.id }, (error, success) => {
//     error //if error
//       ? ( console.error({ error: error }) && res.json({ error: error }) )
//       //otherwise if successful
//       : ( console.log(success) && res.json(success) );
//   })
// })

// router.get('/products', async (req, res) => {
//   const productsData = await Product.findA({});

//   const products = productsData.find({ plain: true });

//   if (!products) {
//     console.error({ error: "Something went wrong!" });
//   }

//   res.json(products);
// });

// router.post('/', async (req, res) => {

//   const product = req.body;
//   console.log(product);

//   const newProduct = await Product.create(product); //this is definitely not right..

//   res.json(newProduct);
// });

// router.put('/products/:id', async (req, res) => {
//   const products = req.body;
//   const updatedProduct = await Product.findOneAndUpdate({ id: req.params.id }, {
//     SET: products
//   }, (success, error) => {
//     if (error) throw error;

//     console.log(success)
//     res.json(success);
//   })

// })

// router.delete('/products/:id', async (req, res) => {
//   const deleteProduct = await Product.destroy({ id: req.params.id })
// })


module.exports = router;