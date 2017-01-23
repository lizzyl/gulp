var gulp = require('gulp'),
  changed = require('gulp-changed'),
  imagemin = require('gulp-imagemin'),
  clean = require('gulp-clean'),
  // connect = require('gulp-connect'),
  paths = require('../config.js');


gulp.task('clean-photo', function() {
  return gulp.src(paths.photo.clean)
    .pipe(clean({
      force: true
    }))
});

gulp.task('photo', ['clean-photo'], function() {
  return gulp.src(paths.photo.all)
    .pipe(changed(paths.photo.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.photo.dest))
    // .pipe(connect.reload());
});
