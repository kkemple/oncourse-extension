'use strict';

const runSequence = require('run-sequence');

module.exports = function(gulp) {
	gulp.task('package', function(done) {
		runSequence('clean-client-dist', [
			'lint',
			'minify-styles',
			'minify-ui',
			'minify-services',
			'copy-vendor-css',
			'copy-manifest',
			'copy-assets'
		], done);
	});
};
