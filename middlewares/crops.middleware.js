const db = require('../models/db');

module.exports.pages = function(req, res, next){
    var page = parseInt(req.query.page) || 1;

    var numItem = 18;

    var begin = (page - 1) * numItem;
    var end = page * numItem;

    var size;
    if(req.params.load){
        size = db.get('seeds').filter({type: req.params.load}).size();
    }
    else{
        size = db.get('seeds').take(126).size().value();
    }

    //tính số page để hiển thị chia trang
    var n = size/numItem;
    var list = [];

    if(size < numItem){
        list[0] = 1;
    }
    else{
        for(var i = 0; i < n; i++){
            list[i] = i + 1;
        }
    }
    //tăng giảm page khi kích '<' or '>'
    var page;

    if(req.query.page < n - 1){
        page = req.query.page;
    }
    else{
        page = req.query.page - 1;
    }
    res.locals.page = page;
    res.locals.begin= begin;
    res.locals.end = end;
    res.locals.list = list;

    next();
}

module.exports.homePages = function(req, res, next){
    var page = parseInt(req.query.page) || 1;

    var numItem = 8;

    var begin = (page - 1) * numItem;
    var end = page * numItem;

    var size = db.get('seeds').size().value();

    //tính số page để hiển thị chia trang
    var n = size/numItem;
    var list = [];

    for(var i = 0; i < n; i++){
        list[i] = i + 1;
    }

    //tăng giảm page khi kích '<' or '>'
    var a;

    if(req.query.page <= n){
        a = req.query.page;
    }
    else{
        a = req.query.page - 1;
    }

    res.locals.page = a;
    res.locals.begin= begin;
    res.locals.end = end;
    res.locals.list = list;

    next();
}