var Movie = require('../models/movie.js')
  , ReviewProvider = function(){};

ReviewProvider.prototype.findAll = function(callback) {
  Movie.find(function (err, movies) {
    if (err) {     
      console.log(err); 
    }
    
    callback(null, movies);
  });
};

ReviewProvider.prototype.findByImdbId = function(imdbId, callback) {
  Movie.find({ imdbId: imdbId }, callback);
};

ReviewProvider.prototype.save = function(review, callback) {    
  var movieInstance = new Movie(review);

  console.log('Saving the following item: ');
  console.log(review);
  console.log('');
  
  movieInstance.save(function(err, movieInstance) {
    if (err) {
      console.log(err);
    }
    
    callback(null, movieInstance);
  });  
};

ReviewProvider.prototype.addReviewToMovie = function(imdbId, review, callback) {
  Movie.update({ imdbId: imdbId }, {'$push': {reviews: review}}, function (err, movie) {
    if (err) {
      callback(err);
    }
    else { 
      callback(null, movie);
    }
  });
};

exports.ReviewProvider = ReviewProvider;