'use strict';
var debug = require('debug')('PluralsightTest:PackageInstaller');

var PackageInstaller = {

  createDependencyObject: function(dependencyStrArr, delimiter) {

    // Check the arguments
    if (!dependencyStrArr || !dependencyStrArr.length) {
      debug('Bad array dependencyStrArr passed in: ', dependencyStrArr);
      throw new Error('Invalid parameter provided');
    }

    //Default delimiter is ': '
    if (!delimiter) {
      delimiter = ':';
    }

    //Max of one dependency per pair
    //Let's make an object of packages and their dependencies
    var dependencyObject = {};

    for (var i = 0; dependencyStrArr.length > i; i++) {
      var packageItem = dependencyStrArr[i];
      if (packageItem.indexOf(delimiter) === -1) {
        //No delimiter in this pair
        debug('Bad delimiter passed in', delimiter);
        throw new Error('Bad delimiter passed in');
      }

      // Get dependency array
      var packageParts = packageItem.split(delimiter);
      var itemArray = [];
      for (var j = 0; packageParts.length > j; j++) {
        var item = packageParts[j].trim();
        if (item === '') {
          continue;
        }

        itemArray.push(item);
      }

      dependencyObject[i] = itemArray;
    }

    return dependencyObject;
  },

  getKeys: function(depObj) {
    if (!depObj) {
      debug('Empty object passed in');
      throw new Error('No dependencyObject passed in');
    }

    return Object.keys(depObj);
  },

  sortDependencies: function(dependencyObject) {
    debug('SORRRR', dependencyObject);
    if (!dependencyObject) {
      // Something failed up the stream
      debug('Whoops! Nothing to sort');
      throw new Error('No dependencyObject passed in');
    }

    var depKeys = PackageInstaller.getKeys(dependencyObject);
    var sortedDependencies = [];

    for (var key in dependencyObject) {
      if (dependencyObject[key] === '') {
        sortedDependencies.push(key);
      } else {
        //We know that we're only going to find one match ever
        var depIndex = sortedDependencies.indexOf(dependencyObject[key]);

        //Insert item in array after dependency
        sortedDependencies.splice(depIndex + 1, 0, key);
      }
    }

    // Might require a double loop
    return sortedDependencies;
  }
};

module.exports = PackageInstaller;
