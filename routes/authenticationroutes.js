var passportWrapper = require('../infrastructure/passportwrapper');

var showLogin = function(req, res) {
  res.render('login.jade', {
      user: req.user, 
      message: req.session.messages
    });
};

var login = function(req, res, next) {
  res.redirect('/');
};

function logout(req, res){
  req.logout();
  res.redirect('/');
}

function showAccount(req, res) {
  res.render('account.jade', { user: req.user });
}

exports.init = function(app) {
  app.get('/login', showLogin);
  app.post('/login', passportWrapper.authenticate, login);
  
  app.get('/logout', logout);
  
  app.get('/account', passportWrapper.ensureAuthenticated, showAccount);
};