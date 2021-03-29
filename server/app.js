const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("keyboard cat"));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

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
      console.log("Google auth success!");
      console.log("accessToken, refreshToken", accessToken, refreshToken)
      console.log("profile", profile);
      const user = {
        id: uuidv4(),
        email: profile.email,
        name: profile.displayName
      }
      return done(null, user);
    }
));

passport.serializeUser(function (user, done) {
  console.log("Serializer : ", user)
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  console.log("DESERIALIZE!")
  done(err, {
    id: "fake user"
  });
});

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
  passport.authorize( 'google', { failureRedirect: '/error' }),
  function(req, res) {

    console.log("google auth completed, req.user:", req.user);
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
