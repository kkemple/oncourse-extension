'use strict';

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const hbsfy = require('hbsfy');
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');


const config = require('../gulp.config.js');

module.exports = function(gulp) {
	gulp.task('bundle-services', function() {
		return browserify({
				entries: config.js.background.entryFile,
				extensions: ['.js', '.hbs'],
				paths: ['./services'],
				debug: true
			})
			.transform(babelify)
			.bundle()
			.on('error', function(err) { console.log(err.message); })
			.pipe(plumber({
				errorHandler: notify.onError("Build Error: <%= error.message %>")
			}))
			.pipe(source(config.js.background.outputFileName + '.js'))
			//.pipe(buffer())
			//.pipe(sourcemaps.init({ loadMaps: true }))
			//.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(config.dist + '/services'))
			//.pipe(livereload())
			.pipe(notify('extension background scripts bundled...'));
	});
};
