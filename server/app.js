var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2').Strategy;
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://sandbox-api.dexcom.com/v2/oauth2/login',
  tokenURL: 'https://sandbox-api.dexcom.com/v2/oauth2/token',
  clientID: process.env.DEXCOM_ID,
  clientSecret: process.env.DEXCOM_SECRET,
  callbackURL: "http://localhost:3000/auth/dexcom/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile.id);
  return cb(null, false);
}
));

passport.use(new GoogleStrategy({
  clientID: process.env.FIT_ID,
  clientSecret: process.env.FIT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true
},
function(request, accessToken, refreshToken, profile, done) {
  console.log(profile.id);
  return done(null, false);
}
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

app.get('/auth/dexcom',
  passport.authorize('oauth2'));

app.get('/auth/dexcom/callback',
  passport.authorize('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

app.get('/auth/google',
  passport.authorize('google', { scope: [ 'email', 'profile' ] }));

app.get( '/auth/google/callback',
  passport.authorize( 'google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

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
