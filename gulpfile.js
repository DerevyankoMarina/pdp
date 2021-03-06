// include the required packages.
var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var del = require('del');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');

var stylint = require('gulp-stylint');
var imagemin = require('gulp-imagemin');


var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/images/',
    fonts: 'build/fonts/'
  },
  src: {
    html: 'markup/src/*.jade',
    js: 'markup/src/js/main.js',
    style: 'markup/src/stylus/main.styl',
    allStyles: 'markup/src/stylus/*.styl',
    img: 'markup/src/images/**/*.*',
    fonts: 'markup/src/fonts/**/*.*'
  },
  watch: {
    html: 'markup/src/**/*.jade',
    js: 'markup/src/js/**/*.js',
    style: 'markup/src/stylus/**/*.styl',
    img: 'markup/src/images/**/*.*',
    fonts: 'markup/src/fonts/**/*.*'
  },
  clean: './build'
};

gulp.task('html:build', function() {
  return gulp.src(path.src.html)
      .pipe( jade({pretty: true}) )
      .pipe(gulp.dest(path.build.html))
});

gulp.task('fonts:build', function() {
  return gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.build.fonts))
});

gulp.task('images:build', function() {
  return gulp.src(path.src.img)
      .pipe(gulp.dest(path.build.img))
});

gulp.task('js:build', function () {
  return gulp.src(path.src.js)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.build.js));
});

gulp.task('clean', function () {
  return del(path.clean)
});

gulp.task('stylus:lint', function () {
  return gulp.src(path.src.allStyles)
    .pipe(stylint())
    .pipe(stylint.reporter());
});


gulp.task('css:build', function () {
  return gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(stylus())
          .pipe(autoprefixer({ //TODO: fix autoprefixer
        browsers: ['last 2 versions'],
        cascade: false
      }))
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css));
});


gulp.task('watcher', function(){
  watch([path.watch.style], function(event, cb) {
    gulp.start('css:build');
    gulp.start('stylus:lint');
  });

  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('images:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
});

gulp.task('build', [
  'html:build',
  'js:build',
  'css:build',
  'fonts:build',
  'images:build'
]);


gulp.task('default', ['build', 'watcher']);


// https://www.npmjs.com/package/gulp-stylus
// https://www.npmjs.com/package/gulp-watch
// https://www.youtube.com/watch?v=Kh4eYdd8O4w&list=PLLnpHn493BHE2RsdyUNpbiVn-cfuV7Fos&index=1
// https://habrahabr.ru/post/208890

