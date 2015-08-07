'use strict';
var debug = require('debug')('PluralsightTest:PackageInstaller:Test:');
var chai = require('chai');
var assert = require('chai').assert;
var expect = require('chai').expect;
var PackageInstaller = require('../lib/packageInstaller');

describe('PackageInstallerTest', function () {

  it('should throw an error if an empty array is passed in', function () {
    var dependencyArray = [];
    var testFunc = function () {
      PackageInstaller.createDependencyObject(dependencyArray);
    };
    expect(testFunc).to.throw('Invalid parameter provided');
  });

  it('should throw and Error if a bad delimiter is passed in', function () {
    var dependencyArray = ['foo+:bar,bar+:,baz+:foo'];
    var testFunc = function () {
      PackageInstaller.createDependencyObject(dependencyArray, ': ');
    };
    expect(testFunc).to.throw('Bad delimiter passed in');
  });

  it('should return a valid dependencyTreeObj', function() {
    var dependencyArray = ['KittenService:', 'Leetmeme: Cyberportal', 'Cyberportal: Ice',
      'CamelCaser: KittenService', 'Fraudstream: Leetmeme', 'Ice: '];
    var dependencyTreeObj = PackageInstaller.createDependencyObject(dependencyArray, ':');
    debug('DEPOBJ', dependencyTreeObj);
    expect(dependencyTreeObj).to.exist;
  });

});
