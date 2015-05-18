'use strict';

const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const livereload = require('gulp-livereload');
const notify = require('gulp-notify');
const minifyCss = require('gulp-minify-css');
const config = require('../gulp.config.js');

module.exports = function(gulp) {
	gulp.task('minify-styles', ['styles'], function() {
		var src = config.client.dist + '/ui/css/' + config.extension.styles.outputFileName + '.css';

		return gulp.src(src)
			.pipe(plumber({
				errorHandler: notify.onError("Build Error: <%= error.message %>")
			}))
			.pipe(minifyCss())
			.pipe(rename(config.client.styles.outputFileName + '.min.css'))
			.pipe(gulp.dest(config.client.dist + '/css/'))
			.pipe(livereload())
			.pipe(notify('Styles created...'));
	});
};
