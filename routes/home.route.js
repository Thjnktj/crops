const express = require('express');

const controller = require('../controllers/home.controller');

const router = express.Router();

router.get('/', controller.index);

router.get('/about', controller.about);

router.get('/news', controller.news);

router.get('/register', controller.resigter);

router.post('/register', controller.postResigter);

module.exports = router;