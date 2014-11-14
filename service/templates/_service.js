/**
 *
 * <%= modulePrefix %><%= _.capitalize(_.camelize(moduleNamePart)) %>: <%= moduleDescription %>
 *
 * @author <%= authorName %>
 * @url http://github.com/<%= githubName %>/<%= moduleName %>
 */

/**
 * @ngdoc module
 * @name <% modulePrefix %><%= _.capitalize(_.camelize(moduleNamePart)) %>
 * @description <%= modulePrefix %><%= _.capitalize(_.camelize(moduleNamePart)) %>: <%= moduleDescription %>
 * @example
 * <doc: example>
 *   <doc: source>
 *     <script>
 *       var app = angular.module('myApp', '<%= githubName %>.<%= _.camelize(moduleName) %>']);
 *       app.controller('myController', ['$scope', '<%= modulePrefix %><%= _.capitalize(_.camelize(moduleNamePart)) %>', function($scope, <%= modulePrefix %><%= _.capitalize(_.camelize(moduleNamePart)) %>) {
 *         // Localize your service object
 *         $scope.serviceObject = <%= modulePrefix %><%= _.capitalize(_.camelize(moduleNamePart)) %>; *
 *     </script>
 *   </doc: source>
 * </doc: example>
 */

'use strict';

// Define the module and add dependencies
angular.module('<%= githubName %>.<%= _.camelize(moduleName) %>', [])

  // You may alternatively use other angular constructors:
  // factory, provider, constant, value
  .service('<%= modulePrefix %><%= _.capitalize(_.camelize(moduleNamePart)) %>', [function () {

    // @example
    // this.images = [];
    // this.addImage = function(url) {
    //   var _this = this;
    //   _this.images.push(url);
    // };
    //
    // this.removeImage = function(idx) {
    //   var _this = this;
    //   _this.images.splice(idx, 1);
    // };

  }]);
