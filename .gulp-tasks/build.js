'use strict';

const runSequence = require('run-sequence');

module.exports = function(gulp) {
	gulp.task('build', function(done) {
		runSequence('clean-dist', [
			'lint',
			'styles',
			'bundle-services',
			'bundle-ui',
			'copy-vendor-css',
			'copy-loaders-css',
			'copy-manifest',
			'copy-assets'
		], done);
	});
};
