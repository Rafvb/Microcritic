var mongoose = require('mongoose')
  , connectionString = 'mongodb://rafvb:rafvb@dharma.mongohq.com:10099/Microcritic';
  
exports.init = function initMongoose()
{
  mongoose.connect(connectionString);  
};