var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:development', function(cb) {
  gulpSequence(['bundlehtml', 'other', 'bundlecss', 'data', 'img', 'bundlejs'], ['webserver', 'watch'], cb);
});
