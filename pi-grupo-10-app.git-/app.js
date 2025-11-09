var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();

// view engine m..
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//middleware configuracion de session
app.use(session({
  secret: "myapp", 
  resave: false,
  saveUninitialized: true
}));

//middleware de sesion hacia vistas 
app.use(function (req, res, next) {
  if (req.session.usuarioLogueado != undefined) {
    res.locals.usuario = req.session.usuarioLogueado;
  }
  return next();
});

//middleware de cookies hacia vistas
app.use(function (req, res, next) {
  if (req.cookies.userEmail != undefined && req.session.usuarioLogueado == undefined) {
    req.session.usuarioLogueado = req.cookies.userEmail;
    res.locals.usuario = req.cookies.userEmail;
  }
  return next(); 
});

//sistema de ruteo
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

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
