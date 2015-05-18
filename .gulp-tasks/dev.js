'use strict';

const runSequence = require('run-sequence');

module.exports = function(gulp) {
	gulp.task('dev', function(done) {
		gulp.watch('./services/**/*.+(js|json|hbs)', ['lint', 'bundle-services']);
		gulp.watch('./ui/js/**/*.+(js|json|hbs)', ['lint', 'bundle-ui']);
		gulp.watch('./ui/styles/**/*.less', ['styles']);
	});
};
