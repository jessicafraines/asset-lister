'use strict';
var Mongo = require('mongodb'),
    _ = require('lodash');

function Person(object){
  this.name   = object.name;
  this.photo  = object.photo;
  this.cash   = parseFloat(object.cash);
  this.assets = [];
}

Object.defineProperty(Person, 'collection', {
  get: function(){return global.mongodb.collection('asset');}
});

Person.all = function(cb){
  Person.collection.find().toArray(function(err, objects){
    var people = objects.map(function(object){
      return changePrototype(object);
    });
    cb(people);
  });
};

Person.prototype.save = function(cb){
  Person.collection.save(this, cb);
};

Person.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Person.collection.findOne({_id:_id}, function(err, object){
    var person = changePrototype(object);
    cb(person);
  });
};

Person.prototype.addAsset = function(asset, cb){
  this.assets.push(asset);
  Person.collection.update({_id:this._id}, {$push: {assets:asset}}, cb);
};


module.exports = Person;

function changePrototype(object){
  return _.create(Person.prototype, object);
}
