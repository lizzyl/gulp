var gulp = require('gulp'),
  clean = require('gulp-clean'),
  // connect = require('gulp-connect'),
  paths = require('../config.js');


gulp.task('clean-jsonData', function() {
  return gulp.src(paths.jsonData.clean)
    .pipe(clean())
});

gulp.task('data', ['clean-jsonData'], function() {
  return gulp.src(paths.jsonData.all)
    .pipe(gulp.dest(paths.jsonData.dest))
    // .pipe(connect.reload());
});
