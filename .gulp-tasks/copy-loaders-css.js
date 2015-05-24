'use strict';

module.exports = function(gulp) {
	gulp.task('copy-loaders-css', function() {
		return gulp.src('./node_modules/loaders.css/loaders.min.css')
			.pipe(gulp.dest('./dist/ui/css'));
	});
};
