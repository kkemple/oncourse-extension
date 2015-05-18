'use strict';

// config for Karma test runner for client tests
const gulpConfig = require('./gulp.config');

const files = [].concat(
	'./ui/js/**/*.js',
	'./services/js/**/*.js',
	'./ui/js/**/*.json',
	'./services/js/**/*.json',
	'./tests/helpers/**/*.js'
	'./tests/specs/**/*.js'
);

module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['browserify', 'jasmine'],
		files: files,
		exclude: [
			'./ui/js/patches/**',
			'./ui/main.js'
			'./services/main.js'
		],
		preprocessors: {
			'./services/js/**/*.js': 'browserify',
			'./ui/js/**/*.js': 'browserify',
			'./services/js/**/*.json': 'browserify',
			'./ui/js/**/*.json': 'browserify',
			'./tests/specs/**/*.js': 'browserify'
		},
		browserify: {
			debug: true,
			transform: ['babelify'],
			extensions: ['.js', '.json'],
			paths: [
				'./ui/js'
				'./services/js'
			]
		},
		browsers: ['PhantomJS'],
		reporters: ['spec']
	});
};
