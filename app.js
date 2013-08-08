
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
  
  , DummyDataBootstrapper = require('./dummydata/dummydatabootstrapper').DummyDataBootstrapper
  , dummyDataBootstrapper = new DummyDataBootstrapper()
  
  , routes = require('./routes')
  , movieRoutes = require('./routes/movieroutes');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/movie/:imdbId', movieRoutes.show);
app.get('/movies/new', movieRoutes.new);
app.post('/movies/new', movieRoutes.create);
app.post('/movie/:imdbId', movieRoutes.addReview);

mongoose.connect(connectionString);

dummyDataBootstrapper.bootstrap();

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
