'use strict';
var debug = require('debug')('PluralsightTest:PackageInstaller');

var PackageInstaller = {

  createDependencyObject: function (dependencyStrArr, delimiter) {

    debug('Creating dependency', dependencyStrArr);

    // Check the arguments
    if (!dependencyStrArr || !dependencyStrArr.length) {
      debug('Bad array dependencyStrArr passed in: ', dependencyStrArr);
      throw new Error('Invalid parameter provided');
    }

    //Default delimiter is ': '
    if (!delimiter) {
      delimiter = ': ';
    }

    //Max of one dependency per pair
    //Let's make an object of packages and their dependencies
    var dependencyObject = {};
    for (var i = 0; dependencyStrArr.length > 0; i++) {
      var packageItem = dependencyStrArr[i];
      debug('Package Item', packageItem);
      if (packageItem.indexOf(delimiter) === -1) {
        //No delimiter in this pair
        debug('Bad delimiter passed in', delimiter);
        throw new Error('Bad delimiter passed in');
      }

      var packageParts = packageItem.split(delimiter);
      var packageName = packageParts[0];
      if (packageParts.length > 1) {
        dependencyObject[packageName] = packageParts[1];
      } else {
        dependencyObject[packageName] = '';
      }

    }

    debug('dependencyObj', dependencyObject);
    return dependencyObject;
  },

  sortDependencies: function (dependencyObject) {
    if (!dependencyObject) {
      // Something failed up the stream
      debug('Whoops! Nothing to sort');
      throw new Error('No dependencyObject passed in');
    }

    var sortedDependencies = [];
    for (var key in dependencyObject) {
      if (dependencyObject[key] === '') {
        sortedDependencies.push(key);
      } else {
        //We know that we're only going to find one match ever
        var depIndex = sortedDependencies.indexOf(dependencyObject[key]);
        //Where do we stuff the item?  Always on the back or do a splice just after the dependency?
        //What if we have a ton of dependencies?
        sortedDependencies.splice(depIndex + 1, 0, key);
      }
    }

    // Might require a double loop
    return sortedDependencies;
  }

};

module.exports = PackageInstaller;
