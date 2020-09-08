const db = require('../models/db');

module.exports = {
    postCreateCrops: function(req, res, next){
        var name = db.get('crops').find({name: req.body.name}).value();

        if(!name){
            error = ['Cây trồng đã thêm thành công'];
            res.redirect('/admin/create/crops');
        }
        else{
            error = ['Cây trồng đã tồn tại'];
            res.redirect('/admin/create/crops');
            return;
        }

        res.locals.name = name;
        next();
    },
    postCreateTypes: function(req, res, next){
        var name = db.get('types').find({type: req.body.type}).value();

        if(!type){
            errs = ['Cây trồng đã thêm thành công'];
            res.redirect('/admin/create/types');
        }
        else{
            errs= ['Cây trồng đã tồn tại'];
            res.redirect('/admin/create/types');
            return;
        }

        res.locals.types = types;
        next();
    },

    postCreateSeeds: function(req, res, next){
        var name = db.get('seeds').find({name: req.body.name}).value();

        if(!name){
            mess = ['Giống đã thêm thành công'];
            res.redirect('/admin/create/seeds');
        }
        else{
            mess = ['Giống đã tồn tại'];
            res.redirect('/admin/create/seeds');
            return;
        }

        res.locals.mess = mess;
        next();
    }
}