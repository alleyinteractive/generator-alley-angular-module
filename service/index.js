'use strict';

var util = require('util'),
  path = require('path'),
  yeoman = require('yeoman-generator'),
  yosay = require('yosay');

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {
  var _this = this;
  yeoman.generators.Base.apply(this, arguments);

  // this.options has the object we passed to `invoke` in app/index.js
  // copy them over for the subgenerator
  for (var prop in _this.options) {
    this[prop] = _this.options[prop];
  }

};

util.inherits(ServiceGenerator, yeoman.generators.Base);

ServiceGenerator.prototype.writeDirective = function writeDirective() {
  this.dest.mkdir('src');

  this.template('_service.js', 'src/' + this.moduleNamePart + '.js');
}
