'use strict';

angular.module('myApp', [
  // Additional Angular modules
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngAnimate',
  // The custom module
  '<%= githubName %>.<%= moduleName %>'
  ]).controller('SimpleCtrl', ['$scope', function($scope) {
    /**
     * @TODO - Put controller level code -- routes, test objects -- here
     */
  }]);
