const express = require('express');

const controller = require('../controllers/crops.controller');
const middleware = require('../middlewares/crops.middleware');

const router = express.Router();

router.get('/',middleware.pages, controller.index);

router.get('/id=:id', controller.detail);

router.get('/load=:id', middleware.pages, controller.loadId);

router.post('/id=:id', controller.postComments);

module.exports = router;