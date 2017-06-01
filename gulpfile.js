var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	fileServer = require('ecstatic')({root: './', cache: 'no-cache', showDir: true}),
	http = require('http'),
	url = require('url');

gulp.task('sass', function () {
	return gulp.src([
			'./app/sass/base/**/*.scss',
			'./app/sass/components/**/*.scss'
		])
		.pipe(plugins.concat('app.scss'))
		.pipe(plugins.sass())
		.pipe(gulp.dest('./dist'))
		.pipe(plugins.livereload());
})

gulp.task('build', function () {
	return browserify({ entries: './app/js/app.js', debug: true })
		.transform('babelify', { presets: ['es2015'] })
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulp.dest('./dist'))
		.pipe(plugins.livereload());
})

// gulp.task('copy-lib', function () {
// 	return gulp.src([
//
// 	])
// 		.pipe(plugins.concat('lib.min.js'))
// 		.pipe(gulp.dest('dist'));
// })

gulp.task('copy-assets', function () {
	return gulp.src('./app/assets/**/*')
		.pipe(gulp.dest('dist/assets'))
		.pipe(plugins.livereload());
})

gulp.task('copy', ['copy-assets'], function () { //['copy-lib', 'copy-assets'],
	return gulp.src('./app/**/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(plugins.livereload());
})

gulp.task('watch', ['build', 'run'], function () {
	plugins.livereload.listen({
		reloadPage: '/dist/index.html'
	});
	gulp.watch('./app/**/*.js', ['build'])
	gulp.watch('./app/**/*.scss', ['sass'])
	gulp.watch('./app/**/*.html', ['copy'])
})

gulp.task('run', function (next) {
	http.createServer().on('request', function (req, res) {
		var urlPath = url.parse(req.url).pathname;
        if (urlPath === '/') {
            req.url = '/dist/index.html';
        } else if (
            ['css', 'html', 'ico', 'less', 'js', 'png', 'txt', 'xml'].indexOf(urlPath.split('.').pop()) == -1 &&
            ['bower_components', 'fonts', 'images', 'src', 'vendor', 'views'].indexOf(urlPath.split('/')[1]) == -1) {
            req.url = '/dist/index.html';
        } else if (['src', 'bower_components'].indexOf(urlPath.split('/')[1]) == -1) {
            req.url = '/dist' + req.url;
        }
		fileServer(req, res);
	}).on('clientError', function (err, socket) {
		socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
	}).listen(8000, function () {
		next()
	})
})

gulp.task('default', function () {
	plugins.runSequence('sass', 'build', 'copy', 'watch')
})
