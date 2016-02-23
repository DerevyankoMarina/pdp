// include the required packages.
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');

gulp.task('default', [
  'convertCss',
  'watcher'
]);

// Get one .styl file and render

gulp.task('convertCss', function () {
  return gulp.src('./css/all.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./build'));
});

gulp.task('watcher', function(){
  watch(['./css/all.styl'], function(event, cb) {
    gulp.start('convertCss');
  });
});


// https://www.npmjs.com/package/gulp-stylus
// https://www.npmjs.com/package/gulp-watch
// https://www.youtube.com/watch?v=Kh4eYdd8O4w&list=PLLnpHn493BHE2RsdyUNpbiVn-cfuV7Fos&index=1
// https://habrahabr.ru/post/208890/