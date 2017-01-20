var gulp = require('gulp'),
  clean = require('gulp-clean'),
  // connect = require('gulp-connect'),
  paths = require('../config.js');


gulp.task('clean-html', function() {
  return gulp.src(paths.html.clean)
    .pipe(clean());
});

gulp.task('bundlehtml', ['clean-html'], function() {
  return gulp.src(paths.html.all)
    .pipe(gulp.dest(paths.html.dest))
    // .pipe(connect.reload());
});
