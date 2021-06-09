const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const axios = require('axios');


//fakestoreapi -- GET dummyProducts route 
router.get('/', (req, res) => {
  console.log("Api is hit")
  axios.get("https://fakestoreapi.com/products")
    .then(data => {
      console.log(data.data);
      res.json(data.data);
    })
    .catch(error => {
      console.error(error);
      res.json({ error: error });
    });
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
//   const productsData = await Product.findAll();

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