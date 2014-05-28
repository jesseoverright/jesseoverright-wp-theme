module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/*.js'],
        dest: 'scripts.js'
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        //cwd: '.',
        src: ['*.css'],
        dest: '.'
      },
      add_banner: {
        options: {
          banner: '/*\n  Theme Name: Jesse Overright\n  Theme URI: http://jesseoverright.com/\n  Author: Jesse Overright\n  Author URI: http://jesseoverright.com/\n  Description: This is a custom theme build for jesseoverright.com.  It\'s a portfolio style theme that adds a new custom content type, portfolio item.\n  Version: 0.5.14 (beta)\n  License: GNU General Public License v2 or later\n  License URI: http://www.gnu.org/licenses/gpl-2.0.html\n  Tags: portfolio */'
        },
        files: {
          'style.css': 'style.css'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> minified scripts */\n'
      },
      dist: {
        files: {
          'scripts.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    watch: {
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify']
      },
      compass: {
        files: ['scss/*.scss'],
        tasks: ['compass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['concat', 'compass', 'cssmin', 'uglify']);

};