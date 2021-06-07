const express = require('express');
const router = express.Router();
const Product = require('../../../models/Product');




//fakestoreapi -- GET dummyProducts route 
router.get('/products', (req, res) => {
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


router.get('/products/:id', async (req, res) => {
  const product = await Product.findOne({ id: req.params.id }, (error, success) => {
    error //if error
      ? ( console.error({ error: error }) && res.json({ error: error }) )
      //otherwise if successful
      : ( console.log(success) && res.json(success) );
  })
})

router.get('/products', async (req, res) => {
  const productsData = await Product.findAll();

  const products = productsData.find({ plain: true });

  if (!products) {
    console.error({ error: "Something went wrong!" });
  }

  res.json(products);
});

router.post('/products', async (req, res) => {
  const product = req.body;
  const newProduct = await Product.createOne(product) //this is definitely not right..

  res.json(newProduct)
});

router.put('/products/:id', async (req, res) => {
  const products = req.body;
  const updatedProduct = await Product.findOneAndUpdate({ id: req.params.id }, {
    SET: products
  }, (success, error) => {
    if (error) throw error;

    console.log(success)
    res.json(success);
  })

})

reouter.delete('/products/:id', async (req, res) => {
  const deleteProduct = await Product.destroy({ id: req.params.id })
})


module.exports = router;