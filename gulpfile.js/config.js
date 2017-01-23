module.exports = {
  html: {
    all: ['src/*.html'],
    clean: './public/*.html',
    dest: './public/'
  },
  css: {
    all: 'src/css/*.css',
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
    all: 'src/data/*.json',
    clean: './public/data/*.json',
    dest: './public/data/'
  },
  img: {
    all: ['src/img/*.png', 'src/img/*.jpg', 'src/img/*.jpeg', 'src/img/*.gif'],
    clean: './public/img/',
    dest: './public/img/'
  },
  photo: {
    all: ['src/photo/*.png', 'src/photo/*.jpg', 'src/photo/*.jpeg', 'src/photo/*.gif'],
    clean: './public/photo/',
    dest: './public/photo/'
  },
  other: {
    all: ['src/*.*', '!src/*.html'],
    clean: ['./public/*.*', '!./public/*.html'],
    dest: './public/'
  }
};
