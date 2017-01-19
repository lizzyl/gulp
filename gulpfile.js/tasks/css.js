var gulp = require('gulp'),
  clean = require('gulp-clean'),
  minifyCss = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect'),
  paths = require('../config.js');


gulp.task('clean-css', function() {
  return gulp.src(paths.css.clean)
    .pipe(clean())
});

gulp.task('bundlecss', ['clean-css'], function() {
  return gulp.src(paths.css.all)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css.dest))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css.dest))
    .pipe(connect.reload())
})
