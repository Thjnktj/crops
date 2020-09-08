const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const path = require('path');

const homeRouter = require('./routes/home.route');
const cropsRouter = require('./routes/crops.route');
const searchRouter = require('./routes/search.route');
const adminRouter = require('./routes/admin.route');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine','pug');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/crops', cropsRouter);
app.use('/search', searchRouter);
app.use('/admin', adminRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render the error
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port,() => {
    console.log(`This website running on port ${port}`);
})