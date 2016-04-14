module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                process: function(src, filepath) {
                    return '/*! Source: ' + filepath + ' */' + '\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                }
            },
            dist: {
                src: [
                    //concat modules first
                    'cb-ng/*.module.js', 'cb-ng/**/*.module.js',
                    //then the routes
                    'cb-ng/*.routes.js', 'cb-ng/**/*.routes.js',
                    //now everything else
                    'cb-ng/*.js', 'cb-ng/**/*.js',
                    //exclude test files
                    '!cb-ng/*.spec.js', '!cb-ng/**/*.spec.js'
                ],
                dest: 'build/js/<%= pkg.name %>.js'
            },
            thirdparty: {
                src: [
                    //include libraries
                    'bower_components/angular/angular.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                    'bower_components/angular-local-storage/dist/angular-local-storage.js',
                    'bower_components/angular-animate/angular-animate.js'
                ],
                dest: 'build/js/thirdparty.js'
            },
            thirdpartyMin: {
                src: [
                    //include libraries
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/angular-local-storage/dist/angular-local-storage.js',
                    'bower_components/angular-animate/angular-animate.js'
                ],
                dest: 'build/js/thirdparty.min.js'
            }
        },
        watch: {
            js: {
                files: ['cb-ng/*.js', 'cb-ng/**/*.js', '!cb-ng/*.spec.js', '!cb-ng/**/*.spec.js'],
                tasks: ['jshint:beforeconcat', 'concat:dist']
            },
            scss: {
                files: ['scss/*.scss'],
                tasks: ['sass']
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
        },
        sass: {
            dist: {
                options: {
                  style: 'compact',
                  "sourcemap=none": '',
                  noCache: true
                },
                files: {
                  'build/css/app.css': 'scss/app.scss'
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: false,
                eqnull: true,
                browser: true,
                funcscope: false,
                unused:true
                // globals: {
                //     jQuery: true
                // }
            },
            beforeconcat: ['cb-ng/*.js', 'cb-ng/**/*.js', '!cb-ng/*.spec.js', '!cb-ng/**/*.spec.js'],
            afterconcat:  ['build/js/<%= pkg.name %>.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('build', ['jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify', 'sass']);
    grunt.registerTask('dev',   ['build', 'watch']);
    grunt.registerTask('js',    ['jshint:beforeconcat']);

};