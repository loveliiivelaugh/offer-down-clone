const express = require('express');
const router = express.Router();
const Product = require('../../models/product');

//fakestoreapi -- GET dummyProducts route 
router.get('/products', (req, res) => {
  axios.get('https://fakestoreapi.com/products')
    .then(data => {
      console.log(data.data);
      res.json(data.data);
    })
    .catch(error => {
      console.error(error);
      res.json({ error: error });
    });
});

// getProduct()
router.get('/products/:id', async (req, res) => {
  try {
    const productData = await Product.findOne({ id: req.params.id });

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }

});

// getProducts()
router.get('/products', async (req, res) => {
  try {
    const productData = await Product.findAll({});

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }

});

// addProduct()
router.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.create(body);

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
});

// updateProduct()
router.put('/products/:id', async (req, res) => {
  console.log(req.body);
  try {
    const productData = await Product.updateOne({ id: req.params.id }, req.body); // talk with team

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  };

});

// deleteProduct() 
router.delete('/products/:id', async (req, res) => {
  try {
    const productData = await Product.remove({ id: req.params.id });

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
});


module.exports = router;