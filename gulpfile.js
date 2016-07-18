'use strict';

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		min = require('gulp-uglify'),
		map = require('gulp-sourcemaps'),
		size = require('gulp-size'),
		concat = require('gulp-concat'),
		del = require('del'),
		jshint = require('gulp-jshint'),
		scsslint = require('gulp-scss-lint'),
		browser = require('browser-sync').create();

var paths = {
	js : './js/**/*.js',
	jsdir : './js',
	script : './scripts/**/*.js',
	scss : [
		'./scss/**/*.scss',
		'!scss/**/*_scsslint_tmp*.scss'
	],
	cssdir : './css',
	html: './**/*.html'
};

// Clean
gulp.task('clean', function (cb) {
	del.sync([
		paths.jsdir,
		paths.cssdir,
		// we don't want to clean this file though so we negate the pattern
		'!./Content/css/deploy.txt'
	], { force: true }, cb);
});

gulp.task('sassDev', function () {
	return gulp.src(paths.scss)
			.pipe(map.init())
			.pipe(sass({
				sourceComments: 'normal'
			}).on('error', sass.logError))
			.pipe(size({ showFiles: true }))
			.pipe(map.write())
			.pipe(gulp.dest(paths.cssdir))
			.pipe(browser.stream());
});

gulp.task('sassDeploy', function () {
	return gulp.src(paths.scss)
			.pipe(sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError))
			.pipe(gulp.dest(paths.cssdir));
});

gulp.task('watch', function () {
	browser.init({
		server: {
			baseDir: "./"
		},
		// if you use local server
		//proxy: {
		//	target: 'http://project.local/',
		//	ws: true
		//},
		//online: true
	});

	gulp.watch(paths.scss, ['sassDev']);
	gulp.watch(paths.script, ['jsLint', 'jsMinDev']);
	gulp.watch([paths.html, paths.js]).on('change', browser.reload);
});

// Minification of js files
gulp.task('jsMinDeploy', function () {
	return gulp.src(paths.script)
		.pipe(concat('all.js'))
		.pipe(min())
		.pipe(gulp.dest(paths.jsdir));
});

// Minification of js files
gulp.task('jsMinDev', function () {
	return gulp.src(paths.script)
			.pipe(map.init())
			.pipe(size({ showFiles: true }))
			.pipe(concat('all.js'))
			.pipe(map.write())
			.pipe(size({ showFiles: true }))
			.pipe(gulp.dest(paths.jsdir));
});

// Detect JS errors
gulp.task('jsLint', function () {
	return gulp.src(paths.script)
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
});

// Detect SASS errors
gulp.task('scssLint', function () {
	return gulp.src(paths.scss)
			.pipe(scsslint({
				'config': 'lint.yml',
			}));
});

// Default task
gulp.task('default', ['clean', 'jsMinDev', 'sassDev', 'watch']);

// Prod task
gulp.task('prod', ['clean', 'jsMinDeploy', 'sassDeploy']);