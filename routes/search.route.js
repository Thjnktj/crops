const express = require('express');

const controller = require('../controllers/search.controller');

const router = express.Router();

router.get('/', controller.index);

router.get('/:key', controller.index);

module.exports = router;