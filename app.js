const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
//const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'builds', 'main')));
app.use(express.static(path.join(__dirname, 'public', 'builds', 'admin')));

// gzip compression for static files
app.use(compression());
// Set limits for different routes - you must install 'express-rate-limit' (npm install express-rate-limit)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 min
  max: 30 // maximum number of requests for one IP address in a time
});
// Apply limits to all routes
app.use(limiter);

app.use('/', indexRouter);
app.use('/admin', adminRouter);
//app.use('/users', usersRouter);

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
