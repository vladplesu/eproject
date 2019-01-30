'use strict';

var gulp      = require('gulp'),
    sass      = require('gulp-sass'),
    uglifycss = require('gulp-uglifycss'),
    maps      = require('gulp-sourcemaps'),
    rename    = require('gulp-rename'),
    terser    = require('gulp-terser');

sass.compiler = require('node-sass');

gulp.task('compileSass', function() {
  return gulp.src('src/scss/**/*.scss')
      .pipe(maps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('./src/css'));
});

gulp.task('minifySass', function(done) {
  gulp.src('src/css/*.css')
      .pipe(uglifycss({
        "uglyComments": true
      }))
      .pipe(rename('style.css'))
      .pipe(gulp.dest('./public/'));
  done();
});

gulp.task('minifyScripts', function(done) {
  gulp.src('src/js/*.js')
      .pipe(terser())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('./public/'));
  done();
});

gulp.task('sass:watch', function() {
  gulp.watch('src/scss/**/*.scss', gulp.series('compileSass'));
});

gulp.task('build', gulp.series('compileSass', 'minifySass', 'minifyScripts'));

gulp.task('default', gulp.series('build'));
