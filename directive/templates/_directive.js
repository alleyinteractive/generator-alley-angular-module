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
 *       var app = angular.module('myApp', '<%= githubName %>.<%= moduleName %>']);
 *     </script>
 *     <div <%= moduleName %>
 *       data="myData"
 *       >
 *     </div>
 *   </doc: source>
 * </doc: example>
 */

'use strict';

// Define the module and add dependencies
angular.module('<%= githubName %>.<%= moduleName %>', [])

  // Use snake case when defining the directive in markup
  // @example
  // <<%= moduleName %> data="myData" />
  .directive('<%= modulePrefix %><%= _.capitalize(_.camelize(moduleNamePart)) %>', [function () {

    return {

      // Restrict this directive to element or attribute instantiation
      restrict: 'EA',

      // Isolate scope -- attributes must be bound to the directive
      scope: {
        // Scope attributes
        // @example
        // data: '=?'
      },

      // Replace your angular markup the parent template with this
      // directive's template. REMEMBER: Doesn't work for repeating elements
      replace: true,

      // The directive template string
      template: function(element, attrs) {
        // @example
        // return '<h3 class="{{ directiveClass }}">{{ data.title }}</h3>
      },

      // The directive link function
      // Runs after compilation
      link: function(scope, element, attrs) {
        // @example
        // scope.directiveClass = data.type;
      },

      // The directive controller
      // Runs before compilation
      controller: function($scope, $element, $attrs) {
      }
    };
  }]);
