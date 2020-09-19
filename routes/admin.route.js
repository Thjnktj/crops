const express = require('express');
const multer = require('multer');
const path = require('path');

const controller = require('../controllers/admin.controller');
const middleware = require('../middlewares/admin.middleware');

//Set storage engine
const storage = multer.diskStorage({
    destination: '../crops/public/upload',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname));
    }
});

//Upload
const upload = multer({
    storage: storage
}).single('images');

const router = express.Router();

router.get('/', controller.index);

router.get('/views', controller.viewCrops);

router.get('/create/crops=:id', controller.deleteCrops);

router.get('/create/types=:id', controller.deleteTypes);

router.get('/views/delete=:id', controller.deleteSeed);

router.get('/views/update=:id', controller.updateSeed);

router.get('/news', controller.viewNews);

router.get('/news/delete=:id', controller.deleteNews);

router.get('/create', controller.create);

router.get('/create/crops', controller.createCrops);

router.get('/create/types', controller.createTypes);

router.get('/create/seeds', controller.createSeeds);

router.get('/news/add', controller.add);

router.get('/users', controller.user);

router.post('/create/crops',middleware.postCreateCrops, controller.postCrops);

router.post('/create/types',middleware.postCreateTypes, controller.postTypes);

router.post('/create/seeds',middleware.postCreateSeeds,function(req, res, next){
    upload(req, res, (err) => {
        if(err){
            res.render('admin/createseeds',{
                mess: err
            });
            req.body.images = '';
        }else{
            if(req.file){
                req.body.images = req.body.images = req.file.filename;
            }
            else{
                req.body.images = '';
            }
        }
        next();
    });
}, controller.postSeeds);

router.post('/news/add', controller.postNews);

module.exports = router;