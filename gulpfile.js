/* eslint-disable */
'use strict';

var gulp = require('gulp'),
  order = require('gulp-order'),
  changed = require('gulp-changed'),
  imagemin = require('gulp-imagemin'),
  clean = require('gulp-clean'),
  minifyCss = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect'),
  eslint = require('gulp-eslint'),
  plumber = require('gulp-plumber'),
  paths = {
    html: {
      all: './src/*.html',
      clean: './public/*.html',
      dest: './public/'
    },
    css: {
      all: './src/css/*.css',
      clean: './public/css/',
      dest: './public/css/'
    },
    js: {
      all: ['src/js/vendor/*.js',
        'src/js/*.js'
      ],
      clean: './public/js/',
      dest: './public/js/'
    },
    jsonData: {
      all: './src/data/*.json',
      clean: './public/data/*.json',
      dest: './public/data/'
    },
    jsonSchema: {
      all: './src/*json',
      clean: './public/*.json',
      dest: './public/'
    },
    img: {
      all: ['./src/img/*.png', './src/img/*.jpg', './src/img/*.jpeg', './src/img/*.gif'],
      clean: './public/img/',
      dest: './public/img/'
    },
    icon: {
      all: ['./src/*.png', './src/*.ico'],
      clean: ['./public/*.png', './public/*.ico'],
      dest: './public/'
    }
  };

var handleErrors = require('./gulp/handle-errors');

gulp.task('connect', function() {
  connect.server({
    port: 8000,
    root: './public',
    livereload: true
  });
});

gulp.task('clean-html', function() {
  return gulp.src(paths.html.clean)
    .pipe(clean())
})
gulp.task('clean-jsonData', function() {
  return gulp.src(paths.jsonData.clean)
    .pipe(clean())
})
gulp.task('clean-img', function() {
  return gulp.src(paths.img.clean)
    .pipe(clean({
      force: true
    }))
})
gulp.task('clean-icon', function() {
  return gulp.src(paths.icon.clean)
    .pipe(clean({
      force: true
    }))
})
gulp.task('clean-css', function() {
  return gulp.src(paths.css.clean)
    .pipe(clean())
})
gulp.task('clean-js', function() {
  return gulp.src(paths.js.clean)
    .pipe(clean())
})
gulp.task('clean-schma', function() {
  return gulp.src(paths.jsonSchema.clean)
    .pipe(clean())
})


gulp.task('img', ['clean-img'], function() {
  return gulp.src(paths.img.all)
    .pipe(changed(paths.img.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.img.dest))
    .pipe(connect.reload());
});
gulp.task('icon', ['clean-icon'], function() {
  return gulp.src(paths.icon.all)
    .pipe(changed(paths.icon.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.icon.dest))
    .pipe(connect.reload());
});

gulp.task('data', ['clean-jsonData'], function() {
  return gulp.src(paths.jsonData.all)
    .pipe(gulp.dest(paths.jsonData.dest))
    .pipe(connect.reload());
});

gulp.task('jsonschema', ['clean-schma'], function() {
  return gulp.src(paths.jsonSchema.all)
    .pipe(gulp.dest(paths.jsonSchema.dest))
    .pipe(connect.reload());
});

gulp.task('bundlehtml', ['clean-html'], function() {
  return gulp.src(paths.html.all)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(connect.reload());
})

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
})

gulp.task('watch', function() {
  gulp.watch([paths.html.all], ['bundlehtml']);
  gulp.watch([paths.js.all], ['bundlejs']);
  gulp.watch([paths.css.all], ['bundlecss']);
  gulp.watch([paths.jsonData.all], ['data']);
  gulp.watch([paths.jsonSchema.all], ['jsonschema']);
  gulp.watch([paths.img.all], ['img']);
  gulp.watch([paths.icon.all], ['icon']);

})

// gulp.task('eslint', function() {
//   return gulp.src(['gulpfile.js', '**/*.js'])
//     .pipe(plumber({
//       errorHandler: handleErrors
//     }))
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(eslint.failOnError());
// });

// gulp.task('watch', function() {
//   gulp.watch(['**/*.html'], ['html']);
//   gulp.watch(['**/*.js'], ['eslint']);
// });

gulp.task('default', ['connect', 'watch']);
