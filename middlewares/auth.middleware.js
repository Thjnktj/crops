const db = require('../models/db');

module.exports = {
    authLogin: function(req, res, next){
        if(!req.signedCookies.userId){
            res.redirect('/auth/login');
            return;
        }

        if(!process.env.ADMIN){
            res.redirect('/auth/login');
            return;
        }

        next();
    }
}