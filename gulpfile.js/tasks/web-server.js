var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('./public').pipe(webserver({
    port: 3000,
    open: true,
    livereload: {
      enable: true
    }
  }));
});
