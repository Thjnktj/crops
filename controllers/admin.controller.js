const db = require('../models/db');
const shortId = require('shortid');

module.exports.index = function(req, res, next){
    res.render('admin/index',{
        title: 'Admin Page'
    });
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
        title: 'News Manage Page'
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
        title: 'Create Crops Page'
    });
}

module.exports.createTypes = function(req, res, next){
    res.render('admin/createtype',{
        title: 'Create Types Crops Page',
        crops: db.get('crops').value()
    });
}

module.exports.createSeeds = function(req, res, next){
    res.render('admin/createseeds',{
        title: 'Create Crops Page'
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
    db.get('types').push(req.body).write();
    res.redirect('/admin/create/types',{
        title: 'Create Types Crops New',
        errs: errs
    });
}

module.exports.postSeeds = function(req, res, next){
    req.body.id = shortId.generate();
    db.get('seeds').push(req.body).write();
    res.redirect('/admin/create/seeds',{
        title: 'Create Crops New',
    });
}

//This is add news page
module.exports.add = function(req, res, next){
    res.render('admin/addnews',{
        title: 'Add News Page'
    });
}

//This is user page
module.exports.user = function(req, res, next){
    res.render('admin/users',{
        title: 'Manage User'
    });
}