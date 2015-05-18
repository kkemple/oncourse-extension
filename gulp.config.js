module.exports = {
	js: {
		background: {
			src: [
				'./services/**/*.js',
				'./services/**/*.json'
			],
			entryFile: './services/main.js',
			outputFileName: 'services'
		},
		foreground: {
			src: [
				'./ui/js/**/*.js',
				'./ui/js/**/*.json'
			],
			entryFile: './ui/js/main.js',
			outputFileName: 'app'
		}
	},
	styles: {
		src: ['./ui/styles/**/*.less'],
		entryFile: './ui/styles/app.less',
		outputFileName: 'app'
	},
	dist: './dist'
};
