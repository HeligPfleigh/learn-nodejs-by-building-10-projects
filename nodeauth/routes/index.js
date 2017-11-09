var express = require('express');
var router = express.Router();

module.exports = function(passport){
  /* GET home page. */
  router.get('/', ensureAuthenticated, function (req, res, next) {
    res.render('index', { title: 'Members' });
  });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      //console.log('Please log in!');
      return next();
    }
    res.redirect('/users/login');
  }

  return router;
}


