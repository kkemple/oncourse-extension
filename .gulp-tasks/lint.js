'use strict';

const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const config = require('../gulp.config.js');

module.exports = function(gulp) {
	gulp.task('lint', function() {
		var src = [].concat(
			config.js.background.src,
			config.js.foreground.src,
			[
				'./gulpfile.js',
				'./tasks/*.js',
				'!./**/*.json'
			]
		);

		return gulp
			.src(src)
			.pipe(plumber({
				errorHandler: notify.onError("Build Error: <%= error.message %>")
			}))
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failOnError());
	});
};
