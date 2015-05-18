'use strict';

const clean = require('gulp-clean');
const notify = require('gulp-notify');
const config = require('../gulp.config.js');

module.exports = function(gulp) {
	gulp.task('clean-dist', function () {
		return gulp.src(config.dist, { read: false })
			.pipe(clean({ force: true }))
			.pipe(notify('extension dist folder cleaned...'));
	});
};
