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
  } else {
    // si no hay sesión, definimos usuario como null
    res.locals.usuario = null;
  }
  return next();
});

//middleware de cookies hacia vistas
app.use(function (req, res, next) {
  if (req.cookies.userEmail != undefined && req.session.usuarioLogueado == undefined) {
     const db = require('./database/models');
     const usuario = db.Usuario;

     usuario.findOne({ where: { email: req.cookies.userEmail } })
      .then(function (usuarioEncontrado) {
        if (usuarioEncontrado) {

          req.session.usuarioLogueado = usuarioEncontrado;
          res.locals.usuario = usuarioEncontrado;
        }
  
        return next(); 
     })
    .catch(function (error) {
        console.log("Error al buscar usuario por cookie:", error);
        return next();
      });
  } else {
    if (req.session.usuarioLogueado != undefined) {
      res.locals.usuario = req.session.usuarioLogueado;
    } else {
      res.locals.usuario = null;
    }
    return next();
  }
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
   res.status(err.status || 500);
  return res.send('Ocurrió un error: ' + err.message);
});

module.exports = app;
