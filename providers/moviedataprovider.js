var http = require('http');

var MovieDataProvider = function(){};

var loadFromTMDB = function loadFromTMDB(review, callback) {
  var options = {
        host: 'api.themoviedb.org',
        port: 80,
        path: '/3/movie/' + review.imdbId + '?api_key=efb84c27e08c0898b4a001a6817ecd81',
        headers: {accept: 'application/json'}
      };

  http.get(options, function(response) {
    var str = '';

		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
      var externalMovieData = JSON.parse(str);
      
      review.imdbId = externalMovieData.imdb_id;
      review.title = externalMovieData.title;
      review.director = 'TODO';
      review.year = '1'; //externalMovieData.release_date;
      review.poster = 'http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w342/' + externalMovieData.poster_path;

      callback(null, review);
		});
	}).on('error', function(e) {
		console.log('Got error: ' + e.message);
		callback(e, null);
  });
};

var loadFromOMDB = function loadFromOMDB(review, callback) {
  var options = {
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

MovieDataProvider.prototype.addMovieData = function(review, callback) {	
  loadFromTMDB(review, callback);
};

exports.MovieDataProvider = MovieDataProvider;