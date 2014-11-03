'use strict';

module.exports = function(grunt) {

	// Load grunt plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /**
   * Function that wraps everything to allow dynamically setting/changing grunt
   * options and config later by grunt task. This init function is called once
   * immediately (for using the default grunt options, config, and setup) and
   * then may be called again AFTER updating grunt (command line) options.
   * @method init
   */
  function init() {

    // Project configuration.
    grunt.initConfig({

      // Config values
      config: {
        src: 'src/{,*/}*.js',
        sass: 'src/{,*/}*.scss',
        unit: 'test/**/*.js',
        e2e: 'e2e/**/*.js',
        dist: 'dist',
        module: '<%= moduleName %>.js',
        minified: '<%= moduleName %>.min.js',
        css: '<%= moduleName %>.css',
        cssmin: '<%= moduleName %>.min.css'
      },

      // Testing
      karma: {
        options: {
          configFile: 'karma.conf.js',
          files: [
            'bower_components/es5-shim/es5-shim.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            '<%%= config.src %>',
            '<%%= config.unit %>'
          ]
        },
        unit: {
          options: {
            browsers: [
              'Chrome'
            ]
          }
        },
        continuous: {
          options: {
            browsers: [
              'PhantomJS'
            ]
          }
        }
      },
      
      // Linting
      jshint: {
        options: {
          jshintrc: '.jshintrc',
          force:	false,
          ignores: ['**.min.js']
        },
        all: [
          'Gruntfile.js',
          '<%%= config.src %>',
          '<%%= config.unit %>',
          '<%%= config.e2e %>'
        ]
      },

      // Developing
      watch: {
        gruntfile: {
          files: ['Gruntfile.js'],
          tasks: ['build']
        },
        js: {
          files: ['<%%= config.src %>', '<%%= config.unit %>'],
          tasks: ['concat', 'karma:unit:run', 'jshint']
        },
        sass: {
          files: ['<%%= config.sass %>'],
          tasks: ['sass:dev']
        },
        livereload: {
          options: {
            livereload: true
          },
          files: ['.tmp/{,*/}*']
        }
      },

      // The actual grunt server
      connect: {
        options: {
          port: 9000,
          livereload: 35729,
          // Change this to '0.0.0.0' to access the server from the outside
          hostname: 'localhost'
        },
        livereload: {
          options: {
            open: true,
            base: [
              'dev',
              '.tmp',
              'src',
              '.'
            ]
          }
        }
      },

      // Clean files before build
      clean: {
        dev: '.tmp',
        dist: '<%%= config.dist %>'
      },

      // Concat
      concat: {
        dev: {
          files: {
            '.tmp/<%%= config.module %>': '<%%= config.src %>'
          }
        },
        dist: {
          files: {
            '<%%= config.dist %>/<%%= config.module %>': '<%%= config.src %>'
          }
        }
      },

      // Copy bower_components for gh-pages
      copy: {
        module: {
          expand: true,
          dest: 'dev/',
          cwd: '<%%= config.dist %>',
          flatten: true,
          src: [
            '<%%= config.css %>',
            '<%%= config.module %>',
          ]
        },
        components: {
          expand: true,
          dest: 'dev/',
          src: [
            'bower_components/**',
          ]
        }
      },

      // ngAnnotate for angular-safe minification
      ngAnnotate: {
        options: {
          singleQuotes: true
        },
        dist: {
          files: {
            '<%%= config.dist %>/<%%= config.module %>':
              '<%%= config.dist %>/<%%= config.module %>'
          }
        }
      },

      // Finally, uglify the minified file
      uglify: {
        options: {
          mangle: false,
          compress: true
        },
        dist: {
          files: {
            '<%%= config.dist %>/<%%= config.minified %>':
              '<%%= config.dist %>/<%%= config.module %>'
          }
        }
      },

      // Sass
      sass: {
        dev: {
          options: {
            style: 'expanded'
          },
          files: {
            '.tmp/<%%= config.css %>': '<%%= config.sass %>'
          }
        },
        dist: {
          options: {
            style: 'expanded'
          },
          files: {
            '<%%= config.dist %>/<%%= config.css %>': '<%%= config.sass %>'
          }
        },
        distmin: {
          options: {
            style: 'compressed'
          },
          files: {
            '<%%= config.dist %>/<%%= config.cssmin %>': '<%%= config.sass %>'
          }
        }
      },

      // Publish to Github Pages
      'gh-pages': {
        options: {
          base: 'dev'
        },
        src: '**/*'
      },

      // Releasing
      bump: {
        options: {
          files: [
            'package.json',
            'bower.json'
          ],
          updateConfigs: [],
          commit: true,
          commitMessage: 'Release v%VERSION%',
          commitFiles: [
            'README.md',
            'CHANGELOG.md',
            'package.json',
            'bower.json',
            '<%%= config.dist %>/<%%= config.module %>',
            '<%%= config.dist %>/<%%= config.minified %>',
            '<%%= config.dist %>/<%%= config.css %>',
            '<%%= config.dist %>/<%%= config.cssmin %>'
          ],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          push: true,
          pushTo: 'origin',
          // options to use with '$ git describe'
          gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
        }
      }
    });
		
		
    // Register/define grunt tasks
    grunt.registerTask('test', [
      'jshint',
      'karma:continuous'
    ]);

    grunt.registerTask('autotest', [
      'concat',
      'karma:unit',
      'karma:unit:run',
      'watch'
    ]);

    grunt.registerTask('build', [
      'clean:dist',
      'concat:dist',
      'sass',
      'ngAnnotate',
      'uglify:dist',
    ]);

    grunt.registerTask('travis', [
      'jshint',
      'test'
    ]);

    grunt.registerTask('release', [
      'build',
      'bump'
    ]);

    grunt.registerTask('pages', [
      'build',
      'copy',
      'gh-pages'
    ]);

    grunt.registerTask('serve', [
      'clean:dev',
      'concat:dev',
      'sass:dev',
      'jshint',
      'connect:livereload',
      'watch'
    ]);

    grunt.registerTask('default', [
      'serve'
    ]);
  }
  //initialize here for defaults (init may be called again later within a task)
  init({});
};
