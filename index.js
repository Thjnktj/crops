require('dotenv').config();

const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');

const homeRouter = require('./routes/home.route');
const cropsRouter = require('./routes/crops.route');
const searchRouter = require('./routes/search.route');
const adminRouter = require('./routes/admin.route');
const authRouter = require('./routes/auth.route');

const middleware = require('./middlewares/auth.middleware');

const app = express();
const port = process.env.PORT || 3200;
const time = new Date(Date.now() + 60*60*1000) // 1 hour

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SCRET));
app.use(session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
        secure: true,
        httpOnly: true,
        domain: 'localhost:3000',
        path: '/',
        exprires: time
    }
}));

app.set('view engine','pug');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/crops', cropsRouter);
app.use('/search', searchRouter);
app.use('/admin',middleware.authLogin, adminRouter);
app.use('/auth', authRouter);

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