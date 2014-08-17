/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Person    = require('../../app/models/person'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'people',
    Mongo     = require('mongodb');

describe('Person', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });
  describe('constructor', function(){
    it('should create a new Person object', function(){
      var o = {name:'bob jones', photo:'http://bob.img', cash:'100'},
          p = new Person(o);
      expect(p).to.be.instanceof(Person);
      expect(p.name).to.equal('bob jones');
      expect(p.photo).to.equal('http://bob.img');
      expect(p.cash).to.equal(100);
      expect(p.assets).to.have.length(0);
    });
  });
  describe('.all', function(){
    it('should get all people', function(done){
      Person.all(function(people){
        expect(people).to.have.length(2);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a person by ID', function(){
      Person.findById('000000000000000000000001', function(person){
        expect(person._id).to.be.instanceof(Mongo.ObjectID);
      });
    });
  });
  describe('#save', function(){
    it('should save a person to the database', function(done){
      var o = {name:'bob jones', photo:'http://bob.img', cash:'100'},
          p = new Person(o);
      p.save(function(){
        expect(p._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('#addAsset', function(){
    it('should add an asset to a given person', function(done){
      Person.findById('000000000000000000000001', function(person){
        person.addAsset({name: 'Boat', photo: 'http://cdn.ubergizmo.com/photos/2009/1/guitar-boat.jpg', value:'50000', count:'1'}, function(){
          expect(person.assets.length).to.equal(3);
          done();
        });
      });
    });
  });
});

