'use strict';

var util = require('util'),
  path = require('path'),
  yeoman = require('yeoman-generator'),
  chalk = require('chalk'),
  yosay = require('yosay');

var AlleyAngularModuleGenerator = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the AlleyAngularModule generator!\nYeoman will guide you through setting up a new module.'
    ));

    var prompts = [
      {
        type: 'list',
        name: 'moduleType',
        message: 'What type of module would you like to create?',
        choices: [
          'directive',
          'service'
        ],
        default: 'directive'
      },
      {
        name: 'moduleName',
        message: 'Name your module (e.g. angular-forminput)'
      },
      {
        name: 'githubName',
        message: 'Github User or Organization Name',
        default: 'alleyinteractive'
      },
      {
        name: 'modulePrefix',
        message: 'Module Prefix - typically an abbreviation of your Github User/Organization Name (e.g. alley)',
        default: 'alley'
      },
      {
        name: 'authorName',
        message: 'Author name and email (e.g. John Smith <johnsmith@email.com>)'
      },
      {
        name: 'moduleDescription',
        message: 'Module description (e.g. AngularJS form input builder directive)'
      },
      {
        name: 'moduleKeywords',
        message: 'Module (Bower) keywords, space separated (i.e. angular AngularJS form input angular-forminput directive)'
      }
    ];

    this.prompt(prompts, function (props) {
      this.options.props = {}; 
      this.options.props.appName = props.appName;
      this.options.props.moduleType = this.moduleType = props.moduleType;
      this.options.props.moduleName = this.moduleName = props.moduleName;

      // pull out the angular prefix to get just the module name
      var prefix = 'angular-';
      this.options.props.moduleNamePart = this.moduleNamePart = props.moduleName.slice(props.moduleName.indexOf(prefix) + prefix.length, props.moduleName.length);

      this.options.props.modulePrefix = this.modulePrefix = props.modulePrefix;
      this.options.props.githubName = this.githubName = props.githubName;
      this.options.props.authorName = this.authorName = props.authorName;
      this.options.props.moduleDescription = this.moduleDescription = props.moduleDescription;
      this.options.props.moduleKeywords = this.moduleKeywords = props.moduleKeywords.split(' ');

      done();
    }.bind(this));
  },

  writing: {
    // Set up the app file that need to be templated
    app: function() {
      this.dest.mkdir('dev');

      this.template('dev/_simpleCtrl.js', 'dev/SimpleCtrl.js');
      this.template('dev/_index.html', 'dev/index.html');

      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_gruntfile.js', 'Gruntfile.js');
      this.template('_protractor.conf.js', 'protractor.conf.js');
      this.template('_README.md', 'README.md');
    },

    // Copy generic config files
    projectfiles: function() {
      this.copy('karma.conf.js', 'karma.conf.js');
      this.copy('editorconfig', '.editorconfig');
      this.copy('jshintrc', '.jshintrc');
      this.copy('gitignore', '.gitignore');
      this.copy('travis.yml', '.travis.yml');
    },

    // Invoke the subgenerator by module type
    subGenerator: function() {
      this.invoke('alley-angular-module:' + this.moduleType, { options: this.options.props });
    }

  },

  end: function() {
    var _this = this;

    var options = {
      bower: true,
      npm: true,
      skipInstall: false,
      callback: function() {
        _this.log.writeln(
          '\n\n' +
          chalk.bold.green('All done! Next steps:') +
          '\n' +
          chalk.bold('1.') + 'Run `grunt serve` to start a local development server\n' +
          chalk.bold('2.') + 'Write your directive or service.\n' +
          chalk.bold('3.') + 'Create a matching Github repo\n' +
          chalk.bold('4.') + 'Run `grunt pages` to to push your demo page to gh-pages.\n' +
          chalk.bold('5.') + 'Run `grunt bump` to push a tagged release to master.\n' + 
          chalk.bold('6.') + '(Optional) Register bower component'
        );
      }
    }

    this.installDependencies(options);
  }
});

module.exports = AlleyAngularModuleGenerator;
