'use strict';
//var Mongo = require('mongodb');

function Person(object){
  this.name   = object.name;
  this.photo  = object.photo;
  this.cash   = parseFloat(object.cash);
  this.assets = [];
}

Object.defineProperty(Person, 'collection', {
  get: function(){return global.mongodb.collection('people');}
});

Person.all = function(cb){
  Person.collection.find().toArray(cb);
};

Person.prototype.save = function(cb){
  Person.collection.save(this, cb);
};
module.exports = Person;

