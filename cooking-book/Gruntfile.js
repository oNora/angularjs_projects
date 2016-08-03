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
                sourceMap: true
            },
            dist: {
                src: [
                    //concat modules first
                    'src/*.module.js', 'src/**/*.module.js',
                    //then the routes
                    'src/*.routes.js', 'src/**/*.routes.js',
                    //now everything else
                    'src/*.js', 'src/**/*.js',
                    //exclude test files
                    '!src/*.spec.js', '!src/**/*.spec.js'
                ],
                dest: 'build/js/<%= pkg.name %>.js'
            },
            thirdparty: {
                src: [
                    //include libraries
                    'node_modules/angular/angular.js',
                    'node_modules/angular-ui-router/release/angular-ui-router.js',
                    'node_modules/angular-local-storage/dist/angular-local-storage.js',
                    'node_modules/angular-animate/angular-animate.js'
                ],
                dest: 'build/js/thirdparty.js'
            },
            thirdpartyMin: {
                src: [
                    //include libraries
                    'node_modules/angular/angular.min.js',
                    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
                    'node_modules/angular-local-storage/dist/angular-local-storage.js',
                    'node_modules/angular-animate/angular-animate.js'
                ],
                dest: 'build/js/thirdparty.min.js'
            }
        },
        watch: {
            js: {
                files: ['src/*.js', 'src/**/*.js', '!src/*.spec.js', '!src/**/*.spec.js'],
                tasks: ['jshint:beforeconcat', 'concat:dist', 'ngdocs']
            },
            scss: {
                files: ['scss/*.scss'],
                tasks: ['sass']
            }
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
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
            beforeconcat: ['src/*.js', 'src/**/*.js', '!src/*.spec.js', '!src/**/*.spec.js'],
            afterconcat:  ['build/js/<%= pkg.name %>.js']
        },
        ngdocs: {
            all: ['src/*.js','src/**/*.js', '!src/*.spec.js', '!src/**/*.spec.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.registerTask('build', ['jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify', 'sass', 'ngdocs']);
    grunt.registerTask('dev',   ['build', 'watch']);
    grunt.registerTask('js',    ['jshint:beforeconcat']);

};