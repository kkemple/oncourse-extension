'use strict';

const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const config = require('../gulp.config.js');

module.exports = function(gulp) {
	gulp.task('minify-services', ['bundle-services'], function() {
		var src = config.dist +
			'/services/js/' +
			config.js.background.outputFileName +
			'.js';

		return gulp.src(src, { base: config.dist + '/services/js' })
			.pipe(plumber({
				errorHandler: notify.onError("Build Error: <%= error.message %>")
			}))
			.pipe(uglify())
			.pipe(rename(config.js.background.outputFileName + '.min.js'))
			.pipe(gulp.dest(config.dist + '/services/js'))
			.pipe(notify('extension background script minified...'));
	});
};
