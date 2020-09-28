const db = require('../models/db');
const shortId = require('shortid');
const { value } = require('../models/db');

module.exports.index = function(req, res, next){
    res.render('admin/index',{
        title: 'Admin Page',
        crops: db.get('crops').size(),
        types: db.get('types').size(),
        seeds: db.get('seeds').size(),
        users: db.get('users').size(),
    });
}

module.exports.statusChanges = function(req, res, next){
    var seed = db.get('seeds').find({id: req.params.id}).value();
    var status;
    if(seed.new === true){
        status = false;
    }
    else{
        status = true;
    }
    db.get('seeds')
        .find({ id: req.params.id })
        .assign({ 
                new: status
            })
        .write();
    res.redirect('/admin/views')
}

//This is view page when looking for watch
module.exports.viewCrops = function(req, res, next){
    res.render('admin/viewcrops',{
        title: 'View Manage Page',
        seeds: db.get('seeds').value()
    });
}

module.exports.viewNews = function(req, res, next){
    res.render('admin/viewnews',{
        title: 'News Manage Page',
        news: db.get('news').value()
    });
}

//this is create crops: crops, type, seeds
//Method: get, post, patch, delete
module.exports.create = function(req, res, next){
    res.render('admin/addcrops',{
        title: 'Add Crops Page'
    });
}

module.exports.createCrops = function(req, res, next){
    res.render('admin/createcrops',{
        title: 'Create Crops Page',
        crops: db.get('crops').value()
    });
}

module.exports.createTypes = function(req, res, next){
    res.render('admin/createtype',{
        title: 'Create Types Crops Page',
        crops: db.get('crops').value(),
        types: db.get('types').value()
    });
}

module.exports.createSeeds = function(req, res, next){
    var last = db.get('seeds').takeRight(1).value();
    var typesLast = db.get('types').find({id: last[0].type}).value();
    res.render('admin/createseeds',{
        title: 'Create Crops Page',
        types: db.get('types').value(),
        value: typesLast.type
    });
}

//Handling post method
module.exports.postCrops = function(req, res, next){
    req.body.id = shortId.generate();
    db.get('crops').push(req.body).write();
    res.redirect('/admin/create/crops',{
        title: 'Create Crops New',
        error: error
    });
}

module.exports.postTypes = function(req, res, next){
    req.body.id = shortId.generate();
    var idCrops = db.get('crops').find({name: req.body.crops}).value();
    req.body.crops = idCrops.id;
    db.get('types').push(req.body).write();
    res.redirect(200,'admin/create/types',{
        title: 'Create Types Crops New',
        errs: errs
    });
}

module.exports.postSeeds = function(req, res, next){
    req.body.id = shortId.generate();
    req.body.view = 0;
    req.body.comment = 0;
    req.body.like = 0;
    req.body.new = false;
    req.body.status = true;
    var now = new Date();

    function checkTime(i){
        if(i<10)
            i = "0" + i;
        return i;
    }

    req.body.date = checkTime(now.getDate() ) + '/' + checkTime(now.getMonth() + 1) + '/' + now.getFullYear();

    //lấy ra id của cây trồng và phân loại của cây trồng đó
    var type = db.get('types').find({type: req.body.type}).value();
    req.body.crops = type.crops;
    req.body.type = type.id;

    db.get('seeds').push(req.body).write();

    res.redirect('/admin/create/seeds');
}

//This is method update
module.exports.update = function(req, res, next){
    var id = req.params.id;
    var seeds = db.get('seeds').find({id:id}).value();
    res.render('admin/uploadseeds',{
        title: 'Upload seeds',
        seeds: seeds,
        value: db.get('types').find({id: seeds.type}).value(),
        types: db.get('types').value()
    })
}

module.exports.updateSeed = function(req, res, next){
    var type = db.get('types').find({type: req.body.type}).value();
    db.get('seeds')
        .find({ id: req.params.id })
        .assign({ 
                name: req.body.name,
                type: type.id,
                images: req.body.images,
                origins: req.body.origins,
                biology: req.body.biology,
                techniques: req.body.techniques,
            })
        .write();
    res.redirect('/admin/views')
}

//This is method delete crops, types, seed by id
module.exports.deleteCrops= function(req, res, next){

    db.get('crops').remove({id: req.params.id}).write();

    res.redirect('/admin/create/crops');
}

module.exports.deleteTypes = function(req, res, next){

    db.get('types').remove({id: req.params.id}).write();

    res.redirect('/admin/create/types');
}

module.exports.deleteSeed = function(req, res, next){
    db.get('seeds').remove({id: req.params.id}).write();
    res.redirect('/admin/views');
}

//This is add news page
module.exports.add = function(req, res, next){
    res.render('admin/addnews',{
        title: 'Add News Page'
    });
}

module.exports.postNews = function(req, res,next){
    req.body.id = shortId.generate();
    db.get('news').push(req.body).write();
    res.redirect('/admin/news');
}

module.exports.deleteNews = function(req, res, next){
    db.get('news').remove({id: req.params.id}).write();
    res.redirect('/admin/news');
}

//This is user page
module.exports.user = function(req, res, next){
    res.render('admin/users',{
        title: 'Manage User',
        users: db.get('users').value()
    });
}
