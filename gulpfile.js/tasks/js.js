var gulp = require('gulp'),
  order = require('gulp-order'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect'),
  eslint = require('gulp-eslint'),
  plumber = require('gulp-plumber'),
  paths = require('../config.js');

var handleErrors = require('../gulp/handle-errors');

gulp.task('clean-js', function() {
  return gulp.src(paths.js.clean)
    .pipe(clean())
});

gulp.task('bundlejs', ['clean-js'], function() {
  return gulp.src(paths.js.all)
    .pipe(order(paths.js.all))
    .pipe(plumber({
      errorHandler: handleErrors
    }))
    .pipe(eslint())
    .pipe(eslint.format())
    // .pipe(eslint.failOnError)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(connect.reload());
});
