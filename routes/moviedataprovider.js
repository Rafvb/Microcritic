MovieDataProvider = function(){};

MovieDataProvider.prototype.getMovieData = function(imdbId, callback) {
	var http = require('http');
		
	var options = {
	  host: 'www.omdbapi.com',
	  port: 80,
	  path: '/?i=' + imdbId
	};

	http.get(options, function(response) {
		var str = '';

		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
		  var externalMovieData = JSON.parse(str);
		  console.log(externalMovieData);				

          var movieData = {
            imdbId: externalMovieData.imdbID,
            title: externalMovieData.Title,
            director: externalMovieData.Director,
            year: externalMovieData.Year,
            poster: externalMovieData.Poster
          };
          
		  callback(null, movieData);
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
		callback(e, null);
	});	
};

exports.MovieDataProvider = MovieDataProvider;