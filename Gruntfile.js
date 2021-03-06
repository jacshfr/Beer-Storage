'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    jshint: {
      all: ['public/app.js'],
      options: {
        jshintrc: true
      }
    },

    jscs: {
      src: 'public/app.js',
      options: {
        config: '.jscsrc'
      }
    },

    simplemocha: {
      File: ['test/app.js']
    }
  });
  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('default', ['test']);
};
