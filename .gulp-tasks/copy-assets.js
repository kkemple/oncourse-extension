'use strict';

module.exports = function(gulp) {
	gulp.task('copy-assets', function() {
		return gulp.src('./assets/*')
			.pipe(gulp.dest('./dist/assets'));
	});
};
