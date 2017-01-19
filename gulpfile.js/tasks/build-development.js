var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:development', function(cb) {
  gulpSequence('connect', ['bundlehtml', 'bundlecss', 'data', 'img', 'bundlejs', 'other'], cb);
});
