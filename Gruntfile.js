module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Set project info
		 */
		project: {
			src: 'resources/src/',
			cssSrc: '<%= project.src %>scss/',
			cssDest: 'resources/css/',
			imgSrc: '<%= project.src %>img/',
			imgDest: 'resources/img/',
			jsSrc: '<%= project.src %>scripts/',
			jsDest: 'resources/scripts/',
			kitSrc: '<%= project.src %>kit/',
			kitDest: ''
		},

		/**
		 * Autoprefixer
		 */
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9'],
				map: true
			},
			dist: {
				files: {
					'<%= project.cssDest %>all.css': '<%= project.cssDest %>all.css',
					'<%= project.cssDest %>redactor.css': '<%= project.cssDest %>redactor.css'
				}
			}
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
					}
				]
			},
		},

		/**
		 * Express
		 */
		express: {
			all: {
				options: {
					port: 9000,
					hostname: "0.0.0.0",
					bases: [__dirname]  // Replace with the directory you want the files served from
										// Make sure you don't use `.` or `..` in the path as Express
										// is likely to return 403 Forbidden responses if you do
										// http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
				}
			}
		},

		/**
		 * Jshint
		 * Options list: https://github.com/jshint/jshint/blob/master/examples/.jshintrc
		 */
		jshint: {
			src: ['Gruntfile.js', '<%= project.jsSrc %>*.js'],
			options: {
				'expr': true
			}
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
		 * Open in browser
		 */
		open: {
			all: {
				// Gets the port from the connect configuration
				path: 'http://localhost:<%= express.all.options.port %>'
			}
		},

		/**
		 * Sass
		 */
		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'<%= project.cssDest %>all.css': '<%= project.cssSrc %>all.scss',
					'<%= project.cssDest %>redactor.css': '<%= project.cssSrc %>redactor.scss'
				}
			}
		},

		/**
		 * Sprite
		 */
		sprite:{
		    normal: {
		        src: '<%= project.imgSrc %>sprite/*.png',
		        dest: '<%= project.imgDest %>sprite.png',
		        destCss: '<%= project.cssSrc %>generic/_sprite.scss',
		        imgPath: '../img/sprite.png',
		        cssVarMap: function (sprite) {
		          	sprite.name = 'sprite_' + sprite.name;
		        }
		    },
		    retina: {
		    	src: '<%= project.imgSrc %>sprite2x/*.png',
		    	dest: '<%= project.imgDest %>sprite2x.png',
		    	destCss: '<%= project.cssSrc %>generic/_sprite2x.scss',
		    	imgPath: '../img/sprite2x.png',
		    	cssVarMap: function (sprite) {
		    	  	sprite.name = 'sprite2x_' + sprite.name;
		    	}
		    }
		},

		/**
		 * Uglify
		 */
		uglify: {
			options: {
				sourceMap: true
			},
			dist: {
				files: [
					{
						src: [
							'<%= project.jsSrc %>functions.js',
							'<%= project.jsSrc %>fw.table.js',
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
			js: {
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
			sass: {
				files: ['<%= project.cssSrc %>**/*.scss'],
				tasks: ['sprite:normal','sprite:retina','sass','autoprefixer'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-codekit');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-spritesmith');

	grunt.task.run('notify_hooks');

	grunt.registerTask('default', ['codekit','sass','uglify','concat','jshint','autoprefixer','sprite:normal','sprite:retina']);
	grunt.registerTask('server', ['express','open','watch']);
};
