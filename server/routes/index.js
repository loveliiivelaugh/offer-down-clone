const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');

router.get('/api', apiRoutes);//🔌

module.exports = router;