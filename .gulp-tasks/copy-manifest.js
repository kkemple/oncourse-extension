'use strict';

module.exports = function(gulp) {
	gulp.task('copy-manifest', function() {
		return gulp.src('./manifest.json')
			.pipe(gulp.dest('./dist'));
	});
};
