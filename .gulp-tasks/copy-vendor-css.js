'use strict';

module.exports = function(gulp) {
	gulp.task('copy-vendor-css', function() {
		return gulp.src('./ui/styles/vendor/*')
			.pipe(gulp.dest('./dist/ui/css'));
	});
};
