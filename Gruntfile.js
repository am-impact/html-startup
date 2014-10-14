module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /**
         * Set project info
         */
        project: {
            src: 'resources/src/',
            jsSrc: '<%= project.src %>scripts/',
            jsDest: 'resources/scripts/',
            kitSrc: '<%= project.src %>kit/',
            kitDest: ''
        },

        /**
         * Codekit
         */
        codekit: {
            globbed_example_config : {
                src : '<%= project.kitSrc %>*.kit',
                dest : '<%= project.kitDest %>'
            }
        },

        /**
         * Compass
         */
        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        /**
         * Contact
         */
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                files: [
                    {
                        src: ['<%= project.jsSrc %>libs/head.load.min.js', '<%= project.jsSrc %>libs/modernizr.min.js'],
                        dest: '<%= project.jsDest %>libs/header.min.js'
                    },
                    {
                        src: ['<%= project.jsSrc %>libs/rem.min.js'],
                        dest: '<%= project.jsDest %>libs/rem.min.js'
                    }
                ]
            },
        },

        /**
         * Uglify
         */
        uglify: {
            options: {
                banner: '/*! Last build: <%= grunt.template.today("dd-mm-yyyy hh:mm:ss") %> */\n',
                sourceMap: true
            },
            dist: {
                files: [
                    {
                        src: ['<%= project.jsSrc %>functions.js','<%= project.jsSrc %>fw.nav.js','<%= project.jsSrc %>all.js'],
                        dest: '<%= project.jsDest %>all.min.js'
                    }
                ]
            }
        },

        /**
         * Watch
         */
        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            default: {
                //files: ['<%= project.src %>**/*.kit','<%= project.src %>**/*.scss','<%= project.src %>**/*.js'],
                files: ['<%= project.src %>**/*.scss','<%= project.src %>**/*.js'],
                tasks: ['default']
            },
            // grunt watch:js
            js: {
                files: ['<%= project.src %>**/*.js'],
                tasks: ['js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-codekit');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['codekit','compass','uglify','concat']);
    grunt.registerTask('js', ['uglify','concat']);
};