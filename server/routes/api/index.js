const express = require('express');
const router = express.Router();


// const stripeRoutes = require('./stripeRoutes.js');
const plaidRoutes = require('./plaidRoutes.js');
const userRoutes = require('./userRoutes.js');
const productRoutes = require('./productRoutes.js');

// router.use('/stripe', stripeRoutes);
router.use('/plaid', plaidRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);


module.exports = router;