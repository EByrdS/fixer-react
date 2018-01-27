var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var htmlreplace = require('gulp-html-replace');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pump = require('pump');

var path = {
  HTML: 'app/index.html',
  ALL: ['app/js/*.js', 'app/js/**/*.js', 'app/index.html'],
  JS: ['app/js/*.js', 'app/js/**/*.js'],
  SCSS: 'app/css/**/*.scss',
  MINIFIED_OUT: 'build.min.js',
  MINIFIED_CSS: 'styles.min.css',
  DEST_SRC: 'dist/src',
  DEST_CSS: 'dist/css',
  DEST_BUILD: 'dist/build',
  DEST: 'dist',
  DEV_DEST_SRC: 'dev/js',
  DEV_DEST_CSS: 'dev/css',
  DEV_DEST: 'dev',
};

/*
 * Development cycle
 */

gulp.task('default', [
  'build-development',
  'serve'
]);

gulp.task('build-development', [
  'sass',
  'transform',
  'copy'
]);

// Convert all SASS files into a cleaned CSS version, reload browserSync.
gulp.task('sass', function(cb) {
  pump([
    gulp.src(path.SCSS),
    sass(),
    cleanCSS(),
    gulp.dest(path.DEV_DEST_CSS),
    browserSync.reload({
      stream: true
    })
  ], cb);
});

// Convert all JSX into JS files, no concatenation.
gulp.task('transform', function(cb) {
  pump([
    gulp.src(path.JS),
    babel(),
    gulp.dest(path.DEV_DEST_SRC)
  ], cb);
});

// Copy index.html file exactly into dev's file.
gulp.task('copy', function(cb) {
  pump([
    gulp.src(path.HTML),
    gulp.dest(path.DEV_DEST)
  ], cb);
});

// Listen to dev directory and reload with changes.
gulp.task('serve', function() {
  connect.server({
    port: 8000,
    base: 'dev',
  }, function() {
    browserSync.init({
      server: 'dev',
      port: 8080
    });
  });
  gulp.watch(path.SCSS, ['sass', browserSync.reload]);
  gulp.watch(path.ALL, browserSync.reload);
  gulp.watch(path.ALL, ['transform', 'copy']);
});

/*
 * Production cycle
 */

gulp.task('production', [
  'build-production',
  'serve-production'
]);

gulp.task('build-production', [
  'replaceHTML',
  'build',
  'sass-production'
]);

// Replace :js and :css builds with their respective tag in index.html.
gulp.task('replaceHTML', function(cb) {
  pump([
    gulp.src(path.HTML),
    htmlreplace({
      'js': 'src/' + path.MINIFIED_OUT,
      'css': 'css/' + path.MINIFIED_CSS,
    }),
    gulp.dest(path.DEST)
  ], cb);
});

// Convert all JSX into JS and create a single minified .js file.
gulp.task('build', function(cb) {
  pump([
    gulp.src(path.JS),
    sourcemaps.init(),
    babel({
      compact: true
    }),
    concat(path.MINIFIED_OUT),
    uglify(path.MINIFIED_OUT),
    sourcemaps.write('.'),
    gulp.dest(path.DEST_SRC)
  ], cb);
});

// Convert all SASS into CSS and create a single minified .css file.
gulp.task('sass-production', function(cb) {
  pump([
    gulp.src(path.SCSS),
    sass(),
    cleanCSS(),
    concat(path.MINIFIED_CSS),
    gulp.dest(path.DEST_CSS),
  ], cb);
});

// Listen to dist directory.
// Note: It doesn't refresh browserSync.
gulp.task('serve-production', function() {
  connect.server({
    port: 8000,
    base: 'dist',
  }, function() {
    browserSync.init({
      server: 'dist',
      port: 8080
    });
  });
});
