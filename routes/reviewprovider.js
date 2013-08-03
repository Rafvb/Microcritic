var mongoose = require('mongoose')
  , Movie = require('../models/movie.js');

var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI;
connectionString = 'mongodb://localhost/microcritic_dev';

mongoose.connect(connectionString);

Movie.remove({}, function(err) { 
  /* Lets bootstrap with dummy data */
  new ReviewProvider().save([
    {
      imdbId: 'tt0054215', 
      title: 'Psycho', 
      director: 'Alfred Hitchcock', 
      year: 1960, 
      poster: 'http://ia.media-imdb.com/images/M/MV5BMTgyNDIxNzQ4MF5BMl5BanBnXkFtZTYwMzkyNTQ2._V1_SX300.jpg', 
      reviews: [{body: "test1", author: "Raf", good: true}]
    },
    {
      imdbId: 'tt0068646', 
      title: 'The Godfather', 
      director: 'Francis Ford Coppola', 
      year: 1972, 
      poster: 'http://ia.media-imdb.com/images/M/MV5BMjEyMjcyNDI4MF5BMl5BanBnXkFtZTcwMDA5Mzg3OA@@._V1_SX300.jpg', 
      reviews: [{body: "test2", author: "Raf", good: false}]
    }
  ], function(error, reviews){});
});

ReviewProvider = function(){};

ReviewProvider.prototype.findAll = function(callback) {
  Movie.find(function (err, movies) {
    if (err){     
      console.log(err); 
    }
    callback(null, movies);
  });
};

ReviewProvider.prototype.findByImdbId = function(imdbId, callback) {
  Movie.find({ imdbId: imdbId }, callback);
};

ReviewProvider.prototype.save = function(reviews, callback) {    
  var review = null;

  if( typeof(reviews.length)=="undefined")
    reviews = [reviews];

  for(var i =0;i< reviews.length;i++ ) {
    review = reviews[i];
    
    console.log('Saving the following item: ');
    console.log(review);
    console.log('');
    
    var movieInstance = new Movie(review);

	movieInstance.save(function (err, movieInstance) {
      if (err){
        console.log(err);
      }
      callback(null, reviews);
    });
  }  
};

exports.ReviewProvider = ReviewProvider;