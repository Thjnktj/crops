const db = require('../models/db');

module.exports = {
    authLogin: function(req, res, next){
        if(!req.signedCookies.adminId){
            res.redirect('/auth/login');
            return;
        }

        next();
    },
    authRegister: function(req, res, next){
        var user = db.get('users').find({username: req.body.username}).value();

        if(user){
            res.render('home/register',{
                message: ['Tài khoản đã tồn tại']
            });
            return;
        }
        
        next();
    }
}