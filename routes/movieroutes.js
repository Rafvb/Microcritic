var ReviewProvider = require('../providers/reviewprovider').ReviewProvider
  , reviewProvider = new ReviewProvider()
  
  , MovieDataProvider = require('../providers/moviedataprovider').MovieDataProvider
  , movieDataProvider = new MovieDataProvider();

/* 
	Show (movie/:id)
	List (movies)
	Edit (movie/:id/edit)
	Update (movie/:id = put)
	New (movie/new)
	Create (movie post)
	Index (/)
*/

exports.show = function(req, res){
	reviewProvider.findByImdbId(req.params.imdbId, function(error, movies){
      var movie = movies[0];
      
      console.log('Showing the following item: ');
      console.log(movie);
      console.log('');
      
      res.render('movie_show.jade', {
		title: movie.title,
		movie: movie
      });
	});
};

exports.new = function(req, res){	
  res.render('movie_new.jade', {
    title: 'New movie'
  });
};

exports.create = function(req, res){
    movieDataProvider.getMovieData(req.param('imdbId'), function(error, movieData){
        reviewProvider.save({
          imdbId: movieData.imdbId,
          title: movieData.title,
          director: movieData.director,
          year: movieData.year,
          poster: movieData.poster,
          reviews: [{
            body: req.param('body'),
            author: req.param('author'),
            good: req.param('good')
          }]
        }, function(error, movieDetails) {
          res.redirect('/movie/' + movieDetails[0].imdbId);
        });
    });
};