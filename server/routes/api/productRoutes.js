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
const Product = require('../../models/Product');
// const axios = require('axios');


// @method -- GET
// @api -- getProducts()
// @descr --  Return all products posted in the database.
router.get('/:id', async (req, res) => {

 
  
  // const totalItems = [];

  try {
      const products = await Product.find({});

  

      const filteredProducts = products.filter(item => item.user_id !== req.params.id);



  //   const users = await User.find({});

  //   users.forEach(({ posted_items }) => {
  //     posted_items.forEach(item => {
  //       totalItems.push(item);
  //     });
  //   });

    // console.log(totalItems);
    res.status(200).json(filteredProducts);
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
router.post('/', async (req, res) => {
  try {


    // const searchedUser = await User.find({email: req.body.user})
      
    const productObject = {
      name: req.body.product.name,
      description: req.body.product.description,
      image: req.body.product.image,
      price: req.body.product.price,
      zip_code: req.body.product.zip_code,
      user_id: req.body.user
    }
    const newProduct = await Product.create(productObject);


    const updatedUser = await User.findByIdAndUpdate({_id:req.body.user}, {$push: {posted_items:newProduct}}, {new: true});

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error, 'backside error')
    res.status(500).json({ errorMessage: error });
  }
});

router.delete('/:id/:user', async (req, res) => {
  console.log(req.params.id, 'backend delete, id');
  console.log(req.params.user, 'backend delete, user');


  const updatedUser = await User.findByIdAndUpdate(req.params.user, {$pull: {
    posted_items: {_id:req.params.id}}},{new:true});

  await Product.findByIdAndDelete({_id:req.params.id});
  res.status(200).json(updatedUser);
});


router.get('/usersaved/:id', async (req, res) => {

  const user = await User.findById(req.params.id);
  console.log(user, 'backend 124')

  res.status(200).json(user.saved_items);
})
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