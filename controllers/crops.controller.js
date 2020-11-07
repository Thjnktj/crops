const db = require('../models/db');
const Date = require('../middlewares/date');
const shortId = require('shortid');

function listItem() {
    var listItem = [];
    var listCrops = [];
    var crops = db.get('crops').value();
    var size = db.get('crops').size().value();

    for(var i = 0 ; i< size; i++){
        listItem[i] = db.get('seeds').filter({ crops: crops[i].id }).size().value();
        listCrops[i] = db.get('types').filter({ crops: crops[i].id }).size().value();
    }
    return { listItem, listCrops };
}

function listTypes() {
    var listTypes = {};
    var listSize = [];
    var crops = db.get('crops').value();
    var size = db.get('crops').size().value();

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < listItem().listCrops[i]; j++) {
            listTypes[i] = db.get('types').filter({ crops: crops[i].id }).value();
            listSize[i] = i;
        }
    }
    return { listTypes, listSize, size };
}

function listCount() {
    var crops = db.get('crops').value();
    var types = db.get('types').value();
    var size = db.get('crops').size().value();
    var list = [];
    var start = 0;
    for (var i = 0; i < size; i++){
        var end = db.get('types').filter({ crops: crops[i].id }).size().value();
        for (var j = start; j < start + end; j++) {
            list[j]= db.get('seeds').filter({ type: types[j].id }).size().value();
            Object.assign(list, list[j]); 
        }
        Object.assign(list, list[i]); 
        start = start + end;
    }
    return { list, size, start, end };
}

module.exports.index = function (req, res, next) {
    res.render('crops/load',{
        title: 'Crops Page - Website about the Crops',
        list: res.locals.list,
        page: res.locals.page || 1,
        crops: db.get('crops').cloneDeep().value(),
        types: db.get('types').cloneDeep().value(),
        seeds: db.get('seeds').cloneDeep().value().slice(res.locals.begin, res.locals.end),
        size: db.get('seeds').size(),
        listItem: listItem().listItem,
        listTypes: listTypes().listTypes,
        listSize: listTypes().listSize,
        listNum: listCount().list,
        images: 'lua.jpg',
        i: 0
    });
}

module.exports.loadId = function (req, res, next) {
    var seeds = db.get('seeds')
        .filter({type: req.params.load})
        .value()
        .slice(res.locals.begin, res.locals.end);
    res.render('crops/load',{
        title: 'Crops Page - Website about the Crops',
        list: res.locals.list,
        page: res.locals.page || 1,
        images: req.images,
        crops: db.get('crops').cloneDeep().value(),
        types: db.get('types').cloneDeep().value(),
        seeds: seeds,
        size: db.get('seeds').size(),
        listItem: listItem().listItem,
        listTypes: listTypes().listTypes,
        listSize: listTypes().listSize,
        listNum: listCount().list,
        i: 0
    })
}

module.exports.detail = function(req, res, next){
    var id = req.params.id;
    var seed = db.get('seeds').find({ id: id }).value();
    var types = db.get('seeds').filter({ type: seed.type }).take(8).value();
    db.get('seeds').find({ id: id }).assign({ view: seed.view + 1 }).write();
    res.render('crops/detail',{
        title: ' Detail Crops - Website about the Crops',
        seed: seed,
        types: types,
        session: req.signedCookies.userId,
        comments: db.get('comments').filter({seed: seed.id}).takeRight(5).value(),
        user: db.get('users').find({id: req.signedCookies.userId}).value(),
        style: 'background-image: url(/upload/' + seed.images + ');',
        images: 'background-image: url(/images/' + req.images[0] + ');',
        images1: req.images[0]
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