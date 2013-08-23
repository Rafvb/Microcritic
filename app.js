var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express() 
  
  , passportWrapper = require('./infrastructure/passportwrapper')  
  , mongooseWrapper = require('./infrastructure/mongoosewrapper')  
  , routesLoader = require('./infrastructure/routesloader')
  
  , dummyDataBootstrapper = require('./dummydata/dummydatabootstrapper');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'M1cr0Cr1t1c' }));

passportWrapper.init(app);

app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

mongooseWrapper.init();
dummyDataBootstrapper.bootstrap();

routesLoader.init(app);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
