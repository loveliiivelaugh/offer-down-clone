const express = require('express');
const router = express.Router();

// //fakestoreapi -- GET dummyProducts route 
// router.get('/products', (req, res) => {
//   axios.get('https://fakestoreapi.com/products')
//     .then(data => {
//       console.log(data.data);
//       res.json(data.data);
//     })
//     .catch(error => {
//       console.error(error);
//       res.json({ error: error });
//     })
// })
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

    // console.log(totalItems);
    res.status(200).json(totalItems);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// // getProduct()
// router.get('/products/:id', async (req, res) => {
//   try {
//     const productData = await Product.findOne({ id: req.params.id });

//     res.status(200).json(productData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }

// });

// // getProducts()
// router.get('/products', async (req, res) => {
//   try {
//     const productData = await Product.findAll({});

//     res.status(200).json(productData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }

// });

// // addProduct()
router.post('/products', async (req, res) => {
  try {

    console.log(req.body, 'im in the bbackend product route')

    const searchedUser = await User.find({email: req.body.user})
      
    const productObject = {
      name: req.body.product.name,
      description: req.body.product.description,
      image: req.body.product.picture,
      price: req.body.product.price,
      zip_code: req.body.product.zip_code,
    }
    

  //   const newProduct = await Product.create(body);

  //   res.status(200).json(newProduct);
  res.end();
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
});

// // updateProduct()
// router.put('/products/:id', async (req, res) => {
//   console.log(req.body);
//   try {
//     const productData = await Product.updateOne({ id: req.params.id }, req.body); // talk with team

//     res.status(200).json(productData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   };

// });

// // deleteProduct() 
// router.delete('/products/:id', async (req, res) => {
//   try {
//     const productData = await Product.remove({ id: req.params.id });

//     res.status(200).json(productData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error });
//   }
// });

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