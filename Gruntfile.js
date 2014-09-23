/**
 *
 * Basic Grunt workflow for small front-end projects
 * repo: https://github.com/juanbrujo/simple-grunt-workflow
 * article: http://www.csslab.cl/2014/04/07/automatizacion-de-tareas-para-proyectos-en-front-end/
 * @csslab / ©2014
 *
**/

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: true,
        compress: true
      },
      my_target: {
        files: {
          'game/js/game.min.js': ['src/js/game.js']
        }
      }
    },
    jshint: {
      files: ["src/js/game.js"],
      options: {
        jshintrc: ".jshintrc"
      }
    },
    less: {
      dist: {
        options: {
            compress: true
        },
        files: {
            'game/css/game.min.css': 'src/less/game.less'
        }
      } 
    },
    open : {
        dev : {
          path: 'http://localhost/FourPoints/game.html',
          app: 'Google Chrome'
        }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['newer:uglify'],
        options: {
            spawn: false
        }
      },
      css: {
        files: ['src/less/*.less'],
        tasks: ['newer:less'],
        options: {
          spawn: false
        }
      },
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['newer:uglify','newer:less','watch']);
  grunt.registerTask("testjs", ["jshint"]);
};