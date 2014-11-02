'use strict';

angular.module('myApp', [
  // Additional Angular modules
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngAnimate',
  // The custom module
  '<%= modulePrefix %>.<%= _.capitalize(_.camelize(moduleNamePart)) %>'
  ]).controller('SimpleCtrl', ['$scope', function($scope) {
    /**
     * @TODO - Put controller level code -- routes, test objects -- here
     */
  }]);
