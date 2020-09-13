const db = require("../models/db");
const { result } = require("../models/db");

module.exports.index = function(req, res, next){
    var key = req.query.key;

    //tìm kiếm theo tên
    var search_name = db.get('seeds').value().filter(function(seed){
        return seed.name.toLowerCase().indexOf(key.toLowerCase()) !== -1;
    });

    //tìm kiếm theo phân loại
    var search_type = db.get('seeds').value().filter(function(seed){
        return seed.type.toLowerCase().indexOf(key.toLowerCase()) !== -1;
    });

    //tìm kiếm theo nguồn gốc
    var search_origins = db.get('seeds').value().filter(function(seed){
        return seed.origins.toLowerCase().indexOf(key.toLowerCase()) !== -1;
    });
        
    res.render('search/index', {
        title: 'Search Page - Website about the Crops',
        seeds: search_type
    });
}