'use strict';
var debug = require('debug')('PluralsightTest:PackageInstaller:Test:');
var chai = require('chai');
var assert = require('chai').assert;
var expect = require('chai').expect;
var PackageInstaller = require('../lib/packageInstaller');

describe('PackageInstallerTest', function() {

  describe('createDependencyObject tests', function() {
    it('should throw an error if an empty array is passed in', function() {
      var dependencyArray = [];
      var testFunc = function() {
        PackageInstaller.createDependencyObject(dependencyArray);
      };

      expect(testFunc).to.throw('Invalid parameter provided');
    });

    it('should throw and Error if a bad delimiter is passed in', function() {
      var dependencyArray = ['foo+:bar,bar+:,baz+:foo'];
      var testFunc = function() {
        PackageInstaller.createDependencyObject(dependencyArray, ': ');
      };

      expect(testFunc).to.throw('Bad delimiter passed in');
    });

    it('should return a valid dependencyTreeObj', function() {
      var dependencyArray = ['KittenService:', 'Leetmeme: Cyberportal', 'Cyberportal: Ice',
        'CamelCaser: KittenService', 'Fraudstream: Leetmeme', 'Ice: '];
      var dependencyTreeObj = PackageInstaller.createDependencyObject(dependencyArray, ':');
      expect(dependencyTreeObj[0][0]).to.equal('KittenService');
    });
  });

  describe('getKeys tests', function() {

    it('should throw an error if no dependency object is passed', function() {
      var dependencyObj = null;
      var testFunc = function() {
        PackageInstaller.getKeys(dependencyObj);
      };

      expect(testFunc).to.throw('No dependencyObject passed in');
    });

    it('should throw an error if no dependency object is passed', function() {
      var dependencyTreeObj = { KittenService: '',
        Leetmeme: 'Cyberportal',
        Cyberportal: 'Ice',
        CamelCaser: 'KittenService',
        Fraudstream: 'Leetmeme',
        Ice: ''
      };
      var keys = PackageInstaller.getKeys(dependencyTreeObj);
      expect(keys.length).to.equal(6);
    });
  });

  describe('sortDependencies tests', function() {

    it('should throw an error if no dependency object is passed', function() {
      var dependencyObj = null;
      var testFunc = function() {
        PackageInstaller.sortDependencies(dependencyObj);
      };

      expect(testFunc).to.throw('No dependencyObject passed in');
    });

    it('should sort a dependencyObj if one is passed in', function() {
      var dependencyTreeObj = { 1: ['KittenService'],
        2: ['Leetmeme', 'Cyberportal'],
        3: ['Cyberportal', 'Ice'],
        4: ['CamelCaser', 'KittenService'],
        5: ['Fraudstream', 'Leetmeme'],
        6: ['Ice']
      };

      var sortedDeps = PackageInstaller.sortDependencies(dependencyTreeObj);
      expect(sortedDeps[0]).to.equal('KittenService');
    });

    it('should throw a cycle error if there are cyclical dependencies', function() {
      var dependencyArray = ['KittenService:', 'Leetmeme: Cyberportal',
            'Cyberportal: Ice', 'CamelCaser: KittenService', 'Fraudstream:',
            'Ice: Leetmeme'];

      var dependencyTreeObj = PackageInstaller.createDependencyObject(dependencyArray, ':');
      var testFunc = function() {
        PackageInstaller.sortDependencies(dependencyTreeObj);
      };

      expect(testFunc).to.throw('Cyclical dependency found');
    });

  });

});
