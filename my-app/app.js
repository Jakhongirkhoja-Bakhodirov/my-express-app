var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const userMiddleware = require('./middlewares/userMiddleware');
const cookieMiddleware = require('./middlewares/cookieValidator');
const router = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Third-Party Middleware
app.use(cookieParser());
app.use(logger('dev'));

// app.use(validateCookie);
app.use(express.static(path.join(__dirname, 'public')));


//Define User Middlewares
app.use(userMiddleware.myLogger);

//Application-level Middleware
app.use('/api/users/:id' , userMiddleware.getUserID);

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

//Error-handling middleware
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Router-Level Middleware
router.use(function (req, res, next) {
    if (req.headers['x-auth']) {
      console.log('Calling router-level middleware');
      return next('router')
    } 
    next()
  })

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
