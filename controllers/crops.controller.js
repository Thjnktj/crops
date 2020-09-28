const db = require('../models/db');
const Date = require('../middlewares/date');
const shortId = require('shortid');

function listItem() {
    var listItem = [];
    var crops = db.get('crops').value();
    var size = db.get('crops').size().value();

    for(var i = 0 ; i< size; i++){
        listItem[i] = db.get('seeds').filter({crops: crops[i].id}).size().value();
    }
    return listItem;
}

module.exports.index = function(req, res, next){
    res.render('crops/load',{
        title: 'Crops Page - Website about the Crops',
        list: res.locals.list,
        page: res.locals.page || 1,
        crops: db.get('crops').cloneDeep().value(),
        types: db.get('types').cloneDeep().value(),
        seeds: db.get('seeds').cloneDeep().value().slice(res.locals.begin, res.locals.end),
        size: db.get('seeds').size(),
        listItem: listItem(),
        i: 0
    });
}

module.exports.loadId = function(req, res, next){
    var seeds = db.get('seeds')
        .filter({crops: req.params.load})
        .take(100)
        .value()
        .slice(res.locals.begin, res.locals.end);
    res.render('crops/load',{
        title: 'Crops Page - Website about the Crops',
        page: res.locals.page || 1,
        list: res.locals.list,
        crops: db.get('crops').cloneDeep().value(),
        types: db.get('types').cloneDeep().value(),
        seeds: seeds,
        size: db.get('seeds').size(),
        listItem: listItem(),
        i: 0
    })
}

module.exports.detail = function(req, res, next){
    var id = req.params.id;
    var seed = db.get('seeds').find({id:id}).value();
    db.get('seeds').find({ id: id }).assign({view: seed.view + 1}).write();
    res.render('crops/detail',{
        title: ' Detail Crops - Website about the Crops',
        seed: seed,
        session: req.signedCookies.userId,
        comments: db.get('comments').filter({seed: seed.id}).takeRight(5).value(),
        user: db.get('users').find({id: req.signedCookies.userId}).value(),
        style: 'background-image: url(/upload/' + seed.images + ');'
    });
}

module.exports.like = function(req, res, next){
    var id = req.params.id;
    var seed = db.get('seeds').find({id:id}).value();
    db.get('seeds').find({ id: id }).assign({like: seed.like+ 1}).write();
    res.redirect('/crops');
}

module.exports.postComments = function(req, res, next){
    var id = req.params.id;
    var user = db.get('users').find({id: req.signedCookies.userId}).value();

    req.body.id = shortId.generate();
    req.body.user = user.username;
    req.body.seed = id;
    req.body.date = Date.getDate() + ', ' + Date.getTime();
    
    db.get('comments').push(req.body).write();

    res.redirect('/crops/id='+id);
}