const db = require('../models/db');

module.exports.index = function(req, res, next){
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

    //tăng giảm page khi kích < or >
    var a;

    if(req.query.page <= n){
        a = req.query.page;
    }
    else{
        a = req.query.page - 1;
    }

    res.locals.page = a

    res.render('crops/index',{
        title: 'Crops Page - Website about the Crops',
        list: list,
        seeds: db.get('seeds').value().slice(begin, end)
    });
}

module.exports.detail = function(req, res, next){
    var id = req.params.id;
    var seed = db.get('seeds').find({id:id}).value();
    res.render('crops/detail',{
        title: ' Detail Crops - Website about the Crops',
        seed: seed
    });
}