var gulp = require('gulp');
var paths = require('../config.js');



gulp.task('watch', function() {
  gulp.watch([paths.html.all], ['bundlehtml']);
  gulp.watch([paths.js.all], ['bundlejs']);
  gulp.watch([paths.css.all], ['bundlecss']);
  gulp.watch([paths.jsonData.all], ['data']);
  gulp.watch([paths.img.all], ['img']);
  gulp.watch([paths.other.all], ['other']);

});
