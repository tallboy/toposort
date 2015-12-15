'use strict';
var debug = require('debug')('Toposort:PackageInstaller');

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

  cycleCheck: function(item, tree) {
    // Cyberportal
    var parent = null; // Leetmeme
    var child = null; // Ice

    for (var branch in tree) {
      if (tree[branch].length > 1) {
        var branchArr = tree[branch];
        if (branchArr[0] === item) {
          child = branchArr[1];
        } else if (branchArr[1] === item) {
          parent = branchArr[0];
        }
      }
    }

    for (var twig in tree) {
      var twigArr = tree[twig];
      if (twigArr.length > 1) {
        if (twigArr[0] === child && twigArr[1] === parent) {
          throw new Error('Cyclical dependency found');
        }
      }
    }

    return false;
  },

  sortDependencies: function(dependencyObject) {

    if (!dependencyObject) {
      // Something failed up the stream
      debug('Whoops! Nothing to sort');
      throw new Error('No dependencyObject passed in');
    }

    var sortedDependencies = [];

    for (var key in dependencyObject) {
      var depArr = dependencyObject[key];
      var depParent = depArr[0];
      var depItem = depArr[1];

      // Only one node put it in rogue nodes
      if (depArr.length === 1 && sortedDependencies.indexOf(depParent === -1)) {
        sortedDependencies.push(depParent);
      } else {
        var hasCycle = PackageInstaller.cycleCheck(depItem, dependencyObject);
        if (!hasCycle) {

          if (sortedDependencies.indexOf(depItem) === -1) {
            sortedDependencies.push(depItem);
          }

          if (sortedDependencies.indexOf(depParent) === -1) {
            var depIndex = sortedDependencies.indexOf(depItem);
            sortedDependencies.splice(depIndex + 1, 0, depParent);
          }
        }
      }
    }

    return sortedDependencies;
  }
};

module.exports = PackageInstaller;
