const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exhbs = require('express-handlebars')
const NavInfo = require('./models/NavInfo')
const footerInfo = require('./models/Footerinfo')
const dotenv = require('dotenv')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session);


dotenv.config({ path: './config/config.env' })

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category')
const adminRouter = require('./routes/admin')
const productRouter = require('./routes/product')
const creatRouter = require('./routes/create');
const footerInfoRouter = require('./routes/footerInfo');
const telRouter = require('./routes/tel');
// const authRouter = require('./routes/auth');
const variables = require('./middleware/virables')


const app = express();

app.engine('hbs', exhbs({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    defaultLayout: 'layout',
    extname: 'hbs',
    partialsDir: [
        path.join(__dirname, 'views/partials')
    ],
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
}))
const store = new MongoStore({
    uri: 'mongodb+srv://user:e1vhWD8bvJfSDQmD@cluster0.p66lp.mongodb.net/change',
    collection: 'session'
})

require('./helper/db')()




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: false,
    secret: 'Sam_secrect_key',
    saveUninitialized: false,
    store
}))

app.use(async(req, res, next) => {
    const navInfo = await NavInfo.find()
    res.locals.navInfo = navInfo
    next()
})

app.use(async(req, res, next) => {
    const footer = await footerInfo.find()
    res.locals.footer = footer
    next()
})

app.use('/admin', express.static(path.join(__dirname, 'public')))
app.use('/admin:any', express.static(path.join(__dirname, 'public')))

app.use(variables)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/admin/category', categoryRouter);
app.use('/admin/product', productRouter);
app.use('/admin/create', creatRouter);
app.use('/admin/footerInfo', footerInfoRouter);
app.use('/admin/tel', telRouter);
// app.use('/auth', authRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;