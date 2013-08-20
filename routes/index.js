var ReviewProvider = require('../providers/reviewprovider').ReviewProvider
  , reviewProvider = new ReviewProvider();

var index = function(req, res){
  reviewProvider.findAll(function(error, movies) {
		res.render('index.jade', {
      title: 'Microcritic',
      movies: movies
		});
	});
};

exports.init = function(app) {
  app.get('/', index);
};