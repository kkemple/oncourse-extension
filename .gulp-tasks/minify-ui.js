'use strict';

const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const config = require('../gulp.config.js');

module.exports = function(gulp) {
	gulp.task('minify-ui', ['bundle-ui'], function() {
		var src = config.dist +
			'/ui/js/' +
			config.js.foreground.outputFileName +
			'.js';

		return gulp.src(src, { base: config.dist + '/ui/js' })
			.pipe(plumber({
				errorHandler: notify.onError("Build Error: <%= error.message %>")
			}))
			.pipe(uglify())
			.pipe(rename(config.js.foreground.outputFileName + '.min.js'))
			.pipe(gulp.dest(config.dist + '/ui/js'))
			.pipe(notify('extension foreground script minified...'));
	});
};
