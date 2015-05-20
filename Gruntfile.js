module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Set paths
		 */
		path: {
			resources: 'resources/',
			cssSrc: '<%= path.resources %>src/scss/',
			cssDest: '<%= path.resources %>css/',
			spriteSrc: '<%= path.resources %>src/img/',
			spriteDest: '<%= path.resources %>sprites/',
			jsSrc: '<%= path.resources %>src/scripts/',
			jsDest: '<%= path.resources %>scripts/',
			kitSrc: '<%= path.resources %>src/kit/',
			kitDest: ''
		},

		/**
		 * Project files
		 */
		files: {
			autoprefixer: {
				'<%= path.cssDest %>all.css': '<%= path.cssDest %>all.css',
				'<%= path.cssDest %>redactor.css': '<%= path.cssDest %>redactor.css'
			},
			codekit: {
				src : '<%= path.kitSrc %>*.kit',
				dest : '<%= path.kitDest %>'
			},
			sass: {
				'<%= path.cssDest %>all.css': '<%= path.cssSrc %>all.scss',
				'<%= path.cssDest %>redactor.css': '<%= path.cssSrc %>redactor.scss'
			},
			uglify: [
				'<%= path.jsSrc %>functions.js',
				'<%= path.jsSrc %>fw.table.js',
				'<%= path.jsSrc %>fitvids.js',
				'<%= path.jsSrc %>all.js'
			]
		},

		/**
		 * Autoprefixer
		 */
		autoprefixer: {
			dev: {
				options: {
					browsers: ['last 2 versions', 'ie 8', 'ie 9'],
					map: true
				},
				files: '<%= files.autoprefixer %>'
			},
			prod: {
				options: {
					browsers: ['last 2 versions', 'ie 8', 'ie 9'],
					map: false
				},
				files: '<%= files.autoprefixer %>'
			}
		},

		/**
		 * Codekit
		 */
		codekit: {
			globbed_example_config : '<%= files.codekit %>'
		},

		/**
		 * Concat
		 */
		concat: {
			options: {
				separator: ';',
			},
			prod: {
				files: [
					{
						src: [
							'<%= path.jsSrc %>libs/head.load.min.js',
							'<%= path.jsSrc %>libs/modernizr.min.js'
						],
						dest: '<%= path.jsDest %>libs/header.min.js'
					}
				]
			}
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
			src: ['Gruntfile.js', '<%= path.jsSrc %>*.js'],
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
			dev: {
				options: {
					sourceMap: true,
					outputStyle: 'expanded'
				},
				files: '<%= files.sass %>'
			},
			prod: {
				options: {
					sourceMap: false,
					outputStyle: 'compressed'
				},
				files: '<%= files.sass %>'
			}
		},

		/**
		 * Sprite
		 */
		sprite:{
		    normal: {
		        src: '<%= path.spriteSrc %>sprite/*.png',
		        dest: '<%= path.spriteDest %>sprite.png',
		        destCss: '<%= path.cssSrc %>generic/_sprite.scss',
		        imgPath: '../sprites/sprite.png',
		        cssVarMap: function (sprite) {
		          	sprite.name = 'sprite_' + sprite.name;
		        }
		    },
		    retina: {
		    	src: '<%= path.spriteSrc %>sprite2x/*.png',
		    	dest: '<%= path.spriteDest %>sprite2x.png',
		    	destCss: '<%= path.cssSrc %>generic/_sprite2x.scss',
		    	imgPath: '../sprites/sprite2x.png',
		    	cssVarMap: function (sprite) {
		    	  	sprite.name = 'sprite2x_' + sprite.name;
		    	}
		    }
		},

		/**
		 * Uglify
		 */
		uglify: {
			dev: {
				options: {
					sourceMap: true,
					mangle: false
				},
				files: [
					{
						src: '<%= files.uglify %>',
						dest: '<%= path.jsDest %>all.min.js'
					}
				]
			},
			prod: {
				options: {
					sourceMap: false,
					mangle: false
				},
				files: [
					{
						src: '<%= files.uglify %>',
						dest: '<%= path.jsDest %>all.min.js'
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
			codekit: {
				files: ['<%= path.kitSrc %>**/*.kit'],
				tasks: ['codekit'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['<%= path.jsSrc %>**/*.js'],
				tasks: ['uglify:dev','concat','jshint'],
				options: {
					livereload: true
				}
			},
			sass: {
				files: ['<%= path.cssSrc %>**/*.scss'],
				tasks: ['sprite:normal','sprite:retina','sass:dev','autoprefixer:dev'],
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

	grunt.registerTask('default', ['codekit','sass:dev','uglify:dev','concat','jshint','autoprefixer:dev','sprite:normal','sprite:retina']);
	grunt.registerTask('production', ['codekit','sass:prod','uglify:prod','concat','jshint','autoprefixer:prod','sprite:normal','sprite:retina']);
	grunt.registerTask('server', ['express','open','watch']);
};
