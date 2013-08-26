var mongoose = require('mongoose')
  , config = require('../infrastructure/config.js');
  
exports.init = function initMongoose()
{
  mongoose.connect(config.connection_string);  
};