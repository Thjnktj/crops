const express = require('express');

const controller = require('../controllers/home.controller');
const middleware = require('../middlewares/auth.middleware');
const homePages = require('../middlewares/crops.middleware');

const router = express.Router();

router.get('/',homePages.homePages, controller.index);

router.get('/logout', controller.logout);

router.get('/about', controller.about);

router.get('/news', controller.news);

router.get('/register', controller.resigter);

router.post('/register',middleware.authRegister, controller.postResigter);

module.exports = router;