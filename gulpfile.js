var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
//var concat = require('gulp-concat');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var resolveDependencies = require('gulp-resolve-dependencies');

//var imagemin = require('gulp-imagemin');

var basePaths = {
  src: './',
  dest: '../dist/'
}

gulp.task('default', ['less','js'], function() {
  gulp.watch(basePaths.src+'less/**/*.less', ['less']);
  gulp.watch(basePaths.src+'js/**/*.js', ['js']);
  //gulp.watch(basePaths.src+'images/**/*', ['images']);
});

gulp.task('less', function () {
  gulp.src(basePaths.src+'less/core.less')
    .pipe(less())
    .pipe(minifyCSS())
    //.pipe(concat('core.css'))
    .pipe(gulp.dest(basePaths.dest+'css'));
});

gulp.task('js', function () {
  gulp.src(basePaths.src+'js/core.js')
  .pipe(resolveDependencies({
      pattern: /\* @requires [\s-]*(.*?\.js)/g
    }))
    //.pipe(concat('core.js'))
    .pipe(uglify())
    .pipe(gulp.dest(basePaths.dest+'js'));
});

// gulp.task('images', function () {
//   gulp.src(basePaths.src+'images/**/*')
//   .pipe(imagemin())
//     .pipe(gulp.dest(basePaths.dest+'images'));
// });
