const express = require('express');
const router = express.Router();


// const stripeRoutes = require('./stripeRoutes.js');
// const plaidRoutes = require('./plaidRoutes.js');
const userRoutes = require('./userRoutes.js');
// const productRoutes = require('./productRoutes.js');

// router.get('/stripe', stripeRoutes);
// router.get('/plaid', plaidRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);


module.exports = router;