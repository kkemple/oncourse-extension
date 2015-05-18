'use strict';

const runSequence = require('run-sequence');

module.exports = function(gulp) {
	gulp.task('test', function(done) {
		karma.start({
			configFile: path.resolve(__dirname, '../karma.config.js'),
			singleRun: true
		}, done);
	});
};
