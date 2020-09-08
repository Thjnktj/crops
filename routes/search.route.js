const express = require('express');

const controller = require('../controllers/search.controller');

const router = express.Router();

router.get('/', controller.index);

router.post('/key', controller.key);

module.exports = router;