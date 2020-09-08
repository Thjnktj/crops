const express = require('express');

const controller = require('../controllers/home.controller');

const router = express.Router();

router.get('/', controller.index);

router.get('/about', controller.about);

router.get('/news', controller.news);

module.exports = router;