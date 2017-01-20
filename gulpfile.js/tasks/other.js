var gulp = require('gulp'),
  changed = require('gulp-changed'),
  imagemin = require('gulp-imagemin'),
  clean = require('gulp-clean'),
  // connect = require('gulp-connect'),
  paths = require('../config.js');

gulp.task('clean-other', function() {
  return gulp.src(paths.other.clean)
    .pipe(clean({
      force: true
    }))
});

gulp.task('other', ['clean-other'], function() {
  return gulp.src(paths.other.all)
    .pipe(changed(paths.other.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.other.dest))
    // .pipe(connect.reload());
});
