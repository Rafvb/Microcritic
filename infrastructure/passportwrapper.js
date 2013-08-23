var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../models/user');

exports.init = function initPassport(app) {  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(function(req, res, next) {
      app.locals({user: req.user});
      next();
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { 
          return done(err); 
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.comparePassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

exports.authenticate = passport.authenticate('local', { failureRedirect: '/login', failureFlash: true });

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
    return next(); 
  }
  
  res.redirect('/login');
};