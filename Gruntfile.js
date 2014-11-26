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
         * Concat
         */
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                files: [
                    {
                        src: [
                            '<%= project.jsSrc %>libs/head.load.min.js',
                            '<%= project.jsSrc %>libs/modernizr.min.js'
                        ],
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
         * Jshint
         */
        jshint: {
            src: ['Gruntfile.js', '<%= project.jsSrc %>*.js']
        },

        /**
         * Notify
         */
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: '<%= pkg.name %>',
                success: false,
                duration: 3
            }
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
                        src: [
                            '<%= project.jsSrc %>functions.js',
                            '<%= project.jsSrc %>fitvids.js',
                            '<%= project.jsSrc %>all.js'
                        ],
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
            javascript: {
                files: ['<%= project.src %>**/*.js'],
                tasks: ['uglify','concat','jshint'],
                options: {
                    livereload: true
                }
            },
            codekit: {
                files: ['<%= project.src %>**/*.kit'],
                tasks: ['codekit'],
                options: {
                    livereload: true
                }
            },
            compass: {
                files: ['<%= project.src %>**/*.scss'],
                tasks: ['compass'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-codekit');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    grunt.task.run('notify_hooks');

    grunt.registerTask('default', ['codekit','compass','uglify','concat','jshint']);
};