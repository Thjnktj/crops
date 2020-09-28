const db = require("../models/db");

module.exports.index = function(req, res, next){
    var key = req.params.key;

    //Bắt key sau đó so sánh key với các trường name, crops, types, origins, biology
    //Sau khi so sánh đưa các dữ liệu bắt được vào một object chung
    //Dùng vòng lặp duyệt các phần tử trong object
    //Nếu các phần tử có chung id thì đưa ra

    // var search = db.get('seeds').value().filter((seeds) => {
    //     if(seeds.name === key)
    //         return seeds.origins.toLowerCase().indexOf(key.toLowerCase()) !== -1;
    // });
    
    res.render('search/index', {
        title: 'Search Page - Website about the Crops'
    });
}

module.exports.result = function(req, res, next){
    res.render('search/result',{
        title: 'Result Search Page - Website about the Crops'
    })
}