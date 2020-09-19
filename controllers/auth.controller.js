const md5 = require('md5');
const db = require('../models/db');

module.exports = {
    login: function(req, res, next){
        if(!req.signedCookies.userId){
            if(!req.signedCookies.adminId)
            {
                res.render('auth/login');
            }
            else{
                res.clearCookie('adminId');
                res.render('auth/login');
            }
        }
        else{
            res.clearCookie('userId');
            res.render('auth/login');
        }
    },

    postLogin: function(req, res){
        var username = req.body.user;
        var pass = req.body.pass;

        var user = db.get('users').find({username: username}).value();

        if(!user){
            res.render('auth/login',{
                values: req.body
            });
        }

        var hashPass1 = md5(pass);

        if(user.password !== hashPass1){
            res.render('auth/login',{
                values: req.body
            });
            return;
        }

        res.locals.username = username;

        //Kiểm tra quyền truy cập và đưa tài khoản vào trang quy định
        //Quy định thời gian tồn tại cookie là 60ph
        const time = new Date(Date.now() + 60*60*1000);
        var role = db.get('roles').find({id: user.role}).value();
        if(role.name === 'users'){
            res.cookie('userId', user.id,{
                signed: true,
                expires: time,
                httpOnly: false
            });
            res.redirect('/');
        }
        else{
            res.cookie('adminId', user.id,{
                signed: true,
                expires: time,
                httpOnly: true
            });
            res.redirect('/admin');
        }
    }
}