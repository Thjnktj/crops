const express = require('express');

const controller = require('../controllers/admin.controller');
const middleware = require('../middlewares/admin.middleware');

const router = express.Router();

router.get('/', controller.index);

router.get('/views', controller.viewCrops);

router.get('/news', controller.viewNews);

router.get('/create', controller.create);

router.get('/create/crops', controller.createCrops);

router.get('/create/types', controller.createTypes);

router.get('/create/seeds', controller.createSeeds);

router.get('/add', controller.add);

router.get('/users', controller.user);

router.post('/create/crops',middleware.postCreateCrops, controller.postCrops);

router.post('/create/types',middleware.postCreateTypes, controller.postTypes);

router.post('/create/seeds',middleware.postCreateSeeds, controller.postSeeds);

module.exports = router;