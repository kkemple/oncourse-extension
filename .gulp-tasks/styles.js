'use strict';

const plumber = require('gulp-plumber');
const less = require('gulp-less');
const rename = require('gulp-rename');
const livereload = require('gulp-livereload');
const notify = require('gulp-notify');
const config = require('../gulp.config.js');

module.exports = function(gulp) {
	gulp.task('styles', function() {
		return gulp.src(config.styles.entryFile )
			.pipe(plumber({
				errorHandler: notify.onError("Build Error: <%= error.message %>")
			}))
			.pipe(less())
			.pipe(rename(config.styles.outputFileName + '.css'))
			.pipe(gulp.dest(config.dist + '/ui/css/'))
			.pipe(livereload())
			.pipe(notify('extension styles created...'));
	});
};
