module.exports.index = function(req, res, next){
    res.render('search/index',{
        title: 'Search Page - Website about the Crops'
    });
}

module.exports.key = function(req, res, next){
    res.render('search/index');
}