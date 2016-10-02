var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed'
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('compress', function() {
  return gulp.src('javascript/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('javascript/min'))
});

gulp.task('concat', ['compress'], function() {
  return gulp.src('javascript/min/*.js')
    .pipe($.concat('app.min.js'))
    .pipe(gulp.dest('js/'));
});

// Set up 'default' task, with watches.
gulp.task('default', ['sass', 'compress', 'concat'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['javascript/*.js'], ['concat']);
});