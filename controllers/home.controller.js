module.exports.index = function(req, res, next){
    res.render('home/index',{
        title: 'Home Page - Website about the Crops'
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