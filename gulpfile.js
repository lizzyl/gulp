/* eslint-disable */
'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    eslint = require('gulp-eslint'),
    plumber = require('gulp-plumber');

var handleErrors = require('./gulp/handle-errors');

gulp.task('connect', function() {
    connect.server({
        root: '.',
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('**/*.html')
        .pipe(connect.reload());
});

gulp.task('eslint', function() {
  return gulp.src(['gulpfile.js', '**/*.js'])
      .pipe(plumber({ errorHandler: handleErrors}))
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
});

gulp.task('watch', function() {
    gulp.watch(['**/*.html'], ['html']);
    gulp.watch(['**/*.js'], ['eslint']);
});

gulp.task('default', ['connect', 'watch']);
