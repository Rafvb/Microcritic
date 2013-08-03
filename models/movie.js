var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MovieSchema = new Schema({
  date : { type: Date, default: Date.now },
  imdbId    : String, 
  title     : String, 
  director  : String, 
  year      : Number, 
  poster    : String, 
  reviews   : [{ 
    date      : { type: Date, default: Date.now },
    body      : String, 
    author    : String,
    good      : Boolean
  }]
});

module.exports = mongoose.model('MovieModel', MovieSchema);
