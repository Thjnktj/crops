const db = require('../models/db');
module.exports.index = function(req, res, next){
    res.render('crops/index',{
        title: 'Crops Page - Website about the Crops',
        seeds: db.get('seeds').value()
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