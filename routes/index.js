var ReviewProvider = require('../providers/reviewprovider').ReviewProvider
  , reviewProvider = new ReviewProvider();

exports.index = function(req, res){
	reviewProvider.findAll(function(error, movies){
		res.render('index.jade', {
            title: 'Microcritic',
            movies: movies
		});
	});
};