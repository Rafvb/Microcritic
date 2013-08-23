var MovieDataProvider = function(){};
 
 /* TODO
  http://www.themoviedb.org/
 */
 
MovieDataProvider.prototype.addMovieData = function(review, callback) {
	var http = require('http')
    , options = {
        host: 'www.omdbapi.com',
        port: 80,
        path: '/?i=' + review.imdbId
      };

	http.get(options, function(response) {
		var str = '';

		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
      var externalMovieData = JSON.parse(str);
      
      console.log(externalMovieData);				

      review.imdbId = externalMovieData.imdbID;
      review.title = externalMovieData.Title;
      review.director = externalMovieData.Director;
      review.year = externalMovieData.Year;
      review.poster = externalMovieData.Poster;

      callback(null, review);
		});
	}).on('error', function(e) {
		console.log('Got error: ' + e.message);
		callback(e, null);
	});	
};

exports.MovieDataProvider = MovieDataProvider;