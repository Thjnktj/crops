const md5 = require('md5');
const db = require('../models/db');

module.exports = {
    login: function(req, res, next){
        if(!req.signedCookies.userId){
            res.render('auth/login');
        }
        else{
            res.clearCookie('userId');
            res.render('auth/login');
        }
    },

    postLogin: function(req, res){
        var username = req.body.user;
        var pass = req.body.pass;

        var date = new Date(Date.now() + 60*15*1000);

        var user = db.get('users').find({username: username}).value();
        
        if(!process.env.ADMIN){
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
            
            res.cookie('userId', user.password,{
                signed: true,
                maxAge: date
            });
    
            res.redirect('/');

            return;
        }

        var hashPass2 = md5(pass);

        if(process.env.PASS !== hashPass2){
            res.render('auth/login',{
                values: req.body
            });
            return;
        }

        res.cookie('userId', process.env.PASS,{
            signed: true
        });

        res.redirect('/admin');
    }
}