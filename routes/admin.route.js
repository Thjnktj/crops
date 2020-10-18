const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../models/db');
const fs = require('fs');
const axios = require('axios');

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

//This function will be responsible for sending to ckeditor
async function sendRequest(method, url, body){
    const CSTimestamp = Date.now();
    const payload = {
        method,
        url,
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'X-CS-Signature': generateSignature( apiSecret, method, url, CSTimestamp, body ),
            'X-CS-Timestamp': CSTimestamp
        }
    };
    if(method.toUpperCase() !== 'GET'){
        payload.data = body;
    }
    try{
        const {status, data } = await axios(payload);
        return {status, data};
    }catch({response}){
        const {status, data } = response;
        return {status, data };
    }
}

const router = express.Router();

router.get('/', controller.index);

router.get('/views', controller.viewCrops);

router.get('/views/id=:id', controller.statusChanges);

router.get('/create/crops=:id', controller.deleteCrops);

router.get('/create/types=:id', controller.deleteTypes);

router.get('/views/delete=:id', controller.deleteSeed);

router.get('/views/update=:id', controller.update);

router.get('/news', controller.viewNews);

router.get('/news/delete=:id', controller.deleteNews);

router.get('/create', controller.create);

router.get('/create/crops', controller.createCrops);

router.get('/create/types', controller.createTypes);

router.get('/create/seeds', controller.createSeeds);

router.get('/news/add', controller.add);

router.get('/users', controller.user);

router.post('/create/crops', middleware.postCreateCrops, controller.postCrops);

router.post('/create/types', middleware.postCreateTypes, controller.postTypes);

router.post('/create/seeds', middleware.postCreateSeeds,function(req, res, next){
    upload(req, res, (err) => {
        if(err){
            res.render('admin/createseeds',{
                mess: err
            });
            req.body.images = '';
        }else{
            if(req.file){
                req.body.images = req.file.filename;
            }
            else{
                req.body.images = '';
            }
        }
        next();
    });
}, controller.postSeeds);

router.post('/views/update=:id',function(req, res, next){
    upload(req, res, (err) => {
        if(err){
            res.render('admin/createseeds',{
                mess: err
            });
            req.body.images = '';
        }else{
            var seed = db.get('seeds').find({id: req.params.id}).value();

            if(req.file){
                const pathToFile = '../crops/public/upload/' + seed.images;
                try {
                    if(seed.images === ''){

                    }
                    else{
                        fs.unlinkSync(pathToFile);
                        console.log("Successfully deleted the file.");
                    }
                } catch(err) {
                    console.log(err);
                }
                req.body.images = req.file.filename;
            }
            else{
                req.body.images = '';
            }
        }
        next();
    });
}, controller.updateSeed);

router.post('/news', controller.addTypeNews);

router.post('/news/add',function(req, res, next){
    upload(req, res, (err) => {
        if(err){
            res.render('admin/createseeds',{
                mess: err
            });
            req.body.images = '';
        }else{
            if(req.file){
                req.body.images = req.file.filename;
            }
            else{
                req.body.images = '';
            }
        }
        next();
    });
}, controller.postNews);

module.exports = router;