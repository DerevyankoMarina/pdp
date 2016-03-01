// include the required packages.
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var del = require('del');

gulp.task('default', [
  //'copy',
  'clean',
  'convertCss',
  'watcher'
]);

gulp.task('clean', function () {
  return del('build')
});

gulp.task('convertCss', function () {
  return gulp.src('./css/all.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

//gulp.task('copy', function () {
//  return gulp.src('./fonts/**')
//      .pipe(gulp.dest('./build'));
//});


gulp.task('watcher', function(){
  watch(['./css/**/*.*'], function(event, cb) {
    gulp.start('convertCss');
  })
});


// https://www.npmjs.com/package/gulp-stylus
// https://www.npmjs.com/package/gulp-watch
// https://www.youtube.com/watch?v=Kh4eYdd8O4w&list=PLLnpHn493BHE2RsdyUNpbiVn-cfuV7Fos&index=1
// https://habrahabr.ru/post/208890/


// https://www.npmjs.com/package/gulp-autoprefixer


