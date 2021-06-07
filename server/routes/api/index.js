const express = require('express');
const router = express.Router();


const stripeRoutes = require('./stripeRoutes.js');
const plaidRoutes = require('./plaidRoutes.js');
const userRoutes = require('./userRoutes.js');

router.get('/stripe', stripeRoutes);
router.get('/plaid', plaidRoutes);
router.get('/users', userRoutes);


module.exports = router;