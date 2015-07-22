var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
//var concat = require('gulp-concat');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var resolveDependencies = require('gulp-resolve-dependencies');

var fileinclude = require('gulp-file-include');

//var imagemin = require('gulp-imagemin');

var basePaths = {
  src: './',
  dest: '../dist/'
}


gulp.task('default', ['less','js','fileinclude','font'], function() {
  gulp.watch(basePaths.src+'less/**/*.less', ['less']);
  gulp.watch(basePaths.src+'js/**/*.js', ['js']);
  gulp.watch(basePaths.src+'html/**/*.html',['fileinclude']);
  gulp.watch(basePaths.src+'font/**/*.*',['font']);
  //gulp.watch(basePaths.src+'images/**/*', ['images']);
});

gulp.task('less', function () {
  gulp.src(basePaths.src+'less/core.less')
    .pipe(less())
    .pipe(minifyCSS())
    //.pipe(concat('core.css'))
    .pipe(gulp.dest(basePaths.dest+'css'));
});

gulp.task('fileinclude', function() {
  gulp.src(basePaths.src+'html/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(basePaths.dest));
});


gulp.task('drupal', function() {
  gulp.src(basePaths.src+'drupal/**/*.*')

    .pipe(gulp.dest(basePaths.dest));
});

gulp.task('font', function() {
  gulp.src(basePaths.src+'font/**/*.*')

    .pipe(gulp.dest(basePaths.dest+'font'));
});

gulp.task('js', function () {
  gulp.src(basePaths.src+'js/**/*.js')
  /*.pipe(resolveDependencies({
      pattern: /\* @requires [\s-]*(.*?\.js)/g
    }))
    .pipe(uglify())*/
    .pipe(gulp.dest(basePaths.dest+'js'));
});

// gulp.task('images', function () {
//   gulp.src(basePaths.src+'images/**/*')
//   .pipe(imagemin())
//     .pipe(gulp.dest(basePaths.dest+'images'));
// });
