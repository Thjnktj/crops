const db = require("../models/db");
const md5 = require("md5");

module.exports.index = function(req, res, next){
    var search_name = db.get('seeds').value().filter(function(seed){
        return seed.name.toLowerCase().indexOf('Lúa'.toLowerCase()) !== -1;
    });
    res.render('home/index',{
        title: 'Home Page - Website about the Crops',
        rice: search_name
    });
}

module.exports.about = function(req, res, next){
    res.render('home/about',{
        title: 'About Page - Website about the Crops'
    });
}

module.exports.news = function(req, res, next){
    res.render('home/news',{
        title: 'News Page - Website about the Crops'
    });
}

module.exports.resigter = function(req, res, next){
    res.render('home/register',{
        title: 'Register'
    })
}

module.exports.postResigter = function(req, res, next){
    req.body.id = shortId.generate();
    req.body.password = md5(req.body.password);
    db.get('users').push(req.body).write();
    //quay lại trang home
    res.redirect('/');
}