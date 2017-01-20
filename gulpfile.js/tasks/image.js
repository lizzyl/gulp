var gulp = require('gulp'),
  changed = require('gulp-changed'),
  imagemin = require('gulp-imagemin'),
  clean = require('gulp-clean'),
  // connect = require('gulp-connect'),
  paths = require('../config.js');


gulp.task('clean-img', function() {
  return gulp.src(paths.img.clean)
    .pipe(clean({
      force: true
    }))
});

gulp.task('img', ['clean-img'], function() {
  return gulp.src(paths.img.all)
    .pipe(changed(paths.img.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.img.dest))
    // .pipe(connect.reload());
});
