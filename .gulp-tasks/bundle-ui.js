'use strict';

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const vBuffer = require('vinyl-buffer');
const babelify = require('babelify');
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');


const config = require('../gulp.config.js');

module.exports = function(gulp) {
	gulp.task('bundle-ui', function() {
		return browserify({
				entries: config.js.foreground.entryFile,
				extensions: ['.js', '.json'],
				paths: ['./ui/js'],
				debug: true
			})
			.transform(babelify)
			.bundle()
			.on('error', function(err) { console.log(err.message); })
			.pipe(plumber({
				errorHandler: notify.onError("Build Error: <%= error.message %>")
			}))
			.pipe(source(config.js.foreground.outputFileName + '.js'))
			//.pipe(vBuffer())
			//.pipe(sourcemaps.init({ loadMaps: true }))
			//.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(config.dist + '/ui/js'))
			//.pipe(livereload())
			.pipe(notify('extension foreground scripts bundled...'));
	});
};
