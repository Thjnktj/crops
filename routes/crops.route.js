const express = require('express');

const controller = require('../controllers/crops.controller');

const router = express.Router();

router.get('/', controller.index);

router.get('/id=:id', controller.detail);

module.exports = router;