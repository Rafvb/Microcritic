
/**
 * Module dependencies.
 */

 /*
 TODO
 http://www.themoviedb.org/
 */
 
var express = require('express')  

  , mongoose = require('mongoose')
  , connectionString = 'mongodb://rafvb:rafvb@dharma.mongohq.com:10099/Microcritic'
  
  , http = require('http')
  , path = require('path')
  , app = express() 
  
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('./models/user')
  
  , dummyDataBootstrapper = require('./dummydata/dummydatabootstrapper')  
  , routesLoader = require('./infrastructure/routesloader');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

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

routesLoader.init(app);

mongoose.connect(connectionString);

dummyDataBootstrapper.bootstrap();

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
