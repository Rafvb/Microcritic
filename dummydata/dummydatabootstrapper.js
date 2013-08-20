var fs = require('fs')
  , Movie = require('../models/movie.js')
  , User = require('../models/user.js')
  , ReviewProvider = require('../providers/reviewprovider').ReviewProvider
  , reviewProvider = new ReviewProvider();

exports.bootstrap = function() {
  Movie.remove({}, function(err) { 
    var saveDummyMovie = function (err, data) {
      var dummyMovie = JSON.parse(data);
      reviewProvider.save(dummyMovie, function(error, reviews){});
    };
    
    fs.readFile('./dummydata/moviedummy1.json', 'utf8', saveDummyMovie);
    fs.readFile('./dummydata/moviedummy2.json', 'utf8', saveDummyMovie);
  });

  var user = new User({ username: 'rafvb', email: 'rafvanbaelen@gmail.com', password: 'rafvb' });
  user.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('user: ' + user.username + " saved.");
    }
  });
};

