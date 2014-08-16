'use strict';

var Person = require('../models/person');

exports.init = function(req, res){
  res.render('people/init');
};
exports.create = function(req, res){
  var person = new Person(req.body);
  person.save(function(){
    res.redirect('/people');
  });
};

exports.index = function(req, res){
  Person.all(function(dogFarts){
    res.render('people/index', {people:dogFarts});
  });
};

exports.show = function(req, res){
  Person.findById(req.params.id, function(dogFarts){
    res.render('people/show', {person:dogFarts});
  });
};

exports.assets = function(req, res){
  Person.findById(req.params.id, function(dogFarts){
    res.render('people/assets', {person:dogFarts});
  });
};

exports.addAssets = function(req, res){
  Person.findById(req.params.id, function(err, person){
    person.addAsset(req.body);
    person.save(function(){
      res.redirect('/people/:id');
    });
  });
};
