const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Product = require('../../models/Product');


/**
 * @method GET
 * @api getProducts()
 * @descr  Return all products posted in the database.
 */
router.get('/', async (req, res) => {

  try {

    const products = await Product.find({});
    const filteredProducts = products.filter(item => item.user_id !== req.params.id);

    res.status(200).json(filteredProducts);

  } catch (error) {

    res.status(500).json({ error: error });

  }
});


/**
 * @method GET /api/products/:id
 * @api getProduct()
 * @descr Return one product by id.
 */
router.get('/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const productData = await Product.findById(req.params.id);

    console.log(productData);

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
});



// // addProduct()
router.post('/', async (req, res) => {
  try {
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

    res.status(500).json({ errorMessage: error });

  }
});

router.delete('/:id/:user', async (req, res) => {

  const updatedUser = await User.findByIdAndUpdate(req.params.user, 
    {$pull: {posted_items: {_id:req.params.id}}},{new:true});

  await Product.findByIdAndDelete({_id:req.params.id});

  res.status(200).json(updatedUser);

});

router.get('/usersaved/:id', async (req, res) => {

  const user = await User.findById(req.params.id);
  
  res.status(200).json(user.saved_items);
  
});

module.exports = router;