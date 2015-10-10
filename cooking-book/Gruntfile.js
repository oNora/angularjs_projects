module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                process: function(src, filepath) {
                    return '/*! Source: ' + filepath + ' */' + '\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                },
            },
            dist: {
                src: [
                    //concat modules first
                    'cb-ng/*.module.js', 'cb-ng/**/*.module.js',
                    //then the routes
                    'cb-ng/*.routes.js', 'cb-ng/**/*.routes.js',
                    //now everything else
                    'cb-ng/*.js', 'cb-ng/**/*.js'
                ],
                dest: 'build/js/<%= pkg.name %>.js'
            }
        },
        watch: {
            js: {
                files: ['cb-ng/*.js', 'cb-ng/**/*.js'],
                tasks: ['concat', 'uglify']
            }
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: false,
                    preserveComments: 'some'
                },
                files: {
                    'build/js/<%= pkg.name %>.min.js': ['build/js/<%= pkg.name %>.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('dev', ['build', 'watch']);

};