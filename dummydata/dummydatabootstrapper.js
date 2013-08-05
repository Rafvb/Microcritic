var fs = require('fs')
  , Movie = require('../models/movie.js')
  , ReviewProvider = require('../providers/reviewprovider').ReviewProvider
  , reviewProvider = new ReviewProvider();

var DummyDataBootstrapper = function(){};

DummyDataBootstrapper.prototype.bootstrap = function() {
  Movie.remove({}, function(err) { 
    var saveDummyMovie = function (err, data) {
      var dummyMovie = JSON.parse(data);
      reviewProvider.save(dummyMovie, function(error, reviews){});
    };
    
    fs.readFile('./dummydata/moviedummy1.json', 'utf8', saveDummyMovie);
    fs.readFile('./dummydata/moviedummy2.json', 'utf8', saveDummyMovie);
  });
};

exports.DummyDataBootstrapper = DummyDataBootstrapper;

