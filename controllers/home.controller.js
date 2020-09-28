const db = require("../models/db");
const shortId = require('shortid');
const md5 = require("md5");

module.exports.index = function(req, res, next){
    res.render('home/index',{
        title: 'Home Page - Website about the Crops',
        rice: db.get('seeds').cloneDeep().filter({crops: 'D58ijQ8LB'}).sortBy({new: true}).takeRight(8).value(),
        corn: db.get('seeds').cloneDeep().filter({crops: "Ka-GIhSpv"}).sortBy({new: true}).takeRight(8).value(),
        potatoes: db.get('seeds').cloneDeep().filter({crops: "7IWcwpkAw"}).sortBy({new: true}).takeRight(8).value(),
        session: req.signedCookies.userId,
        user: db.get('users').find({id: req.signedCookies.userId}).value()
    });
}

module.exports.logout = function(req, res, next){
    if(req.signedCookies.userId){
        if(req.signedCookies.adminId){
            res.clearCookie('adminId');
        }
        res.clearCookie('userId');
        res.redirect('/');
    }
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
    var role = db.get('roles').find({name: "users"}).value();
    req.body.role = role.id;
    req.body.password = md5(req.body.password);
    db.get('users').push(req.body).write();
    //quay lại trang đăng kí
    res.redirect('/register');
}