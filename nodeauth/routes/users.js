var express = require('express');
var router = express.Router();

//Upload files
var multer = require('multer');
var uploads = multer({dest: './uploads'});

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    'title' : 'Register'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    'title' : 'Login'
  });
});

router.post('/register', uploads.single('profileimg'), function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  if(req.file)
  {
    console.log('Uploading File...');

    //file info
    var profileImageOriginalName = req.file.originalname;
    var profileImageName = req.file.name;
    var profileImageMime = req.file.mimetype;
    var profileImagePath = req.file.path;
    var profileImageExt = req.file.extension;
    var profileImageSize = req.file.size;
  }
  else{
    // Set a default image
    var profileImageName = 'noimage.png';
  }

  //Form validation
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Not a valid email').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  //Check for errors
  var errors = req.validationErrors();
  if(errors)
  {
    res.render('register', {
      errors: errors,
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    });
  }
  else{
    var newUser =  new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileImageName
    });

    //Create user
    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });

    req.flash('success', 'You are now registered and can log in');

    res.location('/');
    res.redirect('/');
  }
});



module.exports = router;
