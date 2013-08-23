var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return candidatePassword === this.password;
};

module.exports = mongoose.model('User', UserSchema);