const express = require('express');

const controller = require('../controllers/crops.controller');
const middleware = require('../middlewares/crops.middleware');
const imagesMiddleware = require('../middlewares/images.middleware');

const router = express.Router();

router.get('/',middleware.pages, controller.index);

router.get('/id=:id',imagesMiddleware.images, controller.detail);

router.get('/load=:load', middleware.pages, imagesMiddleware.loadImages, controller.loadId);

router.get('/like=:id', controller.like);

router.post('/id=:id', controller.postComments);

module.exports = router;