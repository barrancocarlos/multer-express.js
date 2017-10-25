var express = require('express');
var app = express();
var path = require('path');
var multer = require('multer');

// file upload destination folder
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  // file upload extension
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
// file upload variable
var upload = multer({
  storage: storage
});

// import model
var Profile = require('../models/profiles');

// api function export
module.exports = function(app) {

  // home page
  app.get('/', function(req, res, next) {
    var profiles = Profile.find().exec(function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      res.render('index', {
        profile: data
      });

    });
  });

  // edit page
  app.get('/:id', function(req, res, next) {
    var profiles = Profile.findById(req.params.id, function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      res.render('edit', {
        profile: data
      });
    });
  });


  // API
  // get all profiles
  app.get('/api', function(req, res, next) {
    var profiles = Profile.find().exec(function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      res.json(data);
    });
  });

  // get single profile
  app.get('/api/:id', function(req, res, next) {
    var profiles = Profile.findById(req.params.id, function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      res.json(data);
      res.render('edit', {
        profile: data
      });
    });
  });

  // post new profile
  // add upload variable
  app.post('/api', upload.single('photo'), function(req, res, next) {
    var profile = new Profile({
      title: req.body.title,
      description: req.body.description,
      photo: req.file.filename,
    });
    console.log(req.file);
    console.log(req.body);
    profile.save(function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      res.redirect('/');

    });

  });


  // delete profile
  app.delete('/api/:id', function(req, res) {
    Profile.findByIdAndRemove(req.params.id, function(err, data) {
      res.redirect('/');
    });

  });

  // update profile
  app.put('/api/:id', upload.single('photo'), function(req, res, next) {
    console.log("edit id");
    Profile.findById(req.params.id, function(err, data) {
      data.title = req.body.title;
      data.description = req.body.description;

      if (req.file) {
        data.photo = req.file.filename;
      }

      data.save(function(err, data) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
};
