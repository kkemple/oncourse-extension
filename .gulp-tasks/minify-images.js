'use strict';

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

module.exports = function(gulp) {
	gulp.task('minify-images', function () {
		return gulp.src('./img/*')
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest('./dist/ui/img'));
	});
};
