var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var babelify = require('babelify');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var htmlreplace = require('gulp-html-replace');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pump = require('pump');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');

var path = {
  HTML: 'app/index.html',
  ENTRY_POINT: 'app/js/index.js',
  JS: 'app/js/**/*.js',
  SCSS: 'app/css/**/*.scss',
  PUBLIC: 'app/public/**/*',
  DEV_PUBLIC: 'dev/public',
  DIST_PUBLIC: 'dist/public',
  OUT: 'build.js',
  MINIFIED_OUT: 'build.min.js',
  MINIFIED_CSS: 'styles.min.css',
  DEV: 'dev',
  DIST: 'dist',
};

function bundle(cb) {
  pump([
    watcher.bundle(),
    source(path.OUT),
    gulp.dest(path.DEV)
  ], cb);
}

var watcher = watchify(browserify({
  entries: [path.ENTRY_POINT],
  transform: [babelify],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

watcher.on('update', bundle);
bundle();

/*
 * Development cycle
 */

gulp.task('default', [
  'sass',
  'transform',
  'replaceHTML-dev',
  'copy-public-dev',
  'serve'
]);

// Convert all SASS files into a cleaned min.CSS version, reload browserSync.
gulp.task('sass', function(cb) {
  pump([
    gulp.src(path.SCSS),
    sourcemaps.init(),
    sass(),
    cleanCSS(),
    concat(path.MINIFIED_CSS),
    sourcemaps.write(),
    gulp.dest(path.DEV),
    browserSync.reload({
      stream: true
    })
  ], cb);
});

// Convert all JSX into a single JS file.
gulp.task('transform', function(cb) {
  pump([
    watcher.bundle(),
    source(path.OUT),
    gulp.dest(path.DEV)
  ], cb);
});

// Copy index.html file into dev's folder, insert correct tags.
gulp.task('replaceHTML-dev', function(cb) {
  pump([
    gulp.src(path.HTML),
    htmlreplace({
      'js': path.OUT,
      'css': path.MINIFIED_CSS,
    }),
    gulp.dest(path.DEV)
  ], cb);
});

// Copy public dir into dev
gulp.task('copy-public-dev', function(cb) {
  pump([
    gulp.src(path.PUBLIC),
    gulp.dest(path.DEV_PUBLIC)
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
  gulp.watch(path.JS, browserSync.reload);
  gulp.watch(path.HTML, ['replaceHTML-dev', browserSync.reload]);
});

/*
 * Production cycle
 */

gulp.task('production', [
  'replaceHTML-prod',
  'copy-public-prod',
  'build',
  'sass-production',
  'serve-production'
]);

// Copy index.html file into dist's folder, insert correct tags.
gulp.task('replaceHTML-prod', function(cb) {
  pump([
    gulp.src(path.HTML),
    htmlreplace({
      'js': path.MINIFIED_OUT,
      'css': path.MINIFIED_CSS,
    }),
    gulp.dest(path.DIST)
  ], cb);
});

// Convert all JSX into JS and create a single minified .js file.
gulp.task('build', function(cb) {
  pump([
    browserify({
      entries: [path.ENTRY_POINT],
      transform: [babelify]
    }).bundle(),
    source(path.MINIFIED_OUT),
    streamify(uglify(path.MINIFIED_OUT)),
    gulp.dest(path.DIST)
  ], cb);
});

// Convert all SASS into CSS and create a single minified .css file.
gulp.task('sass-production', function(cb) {
  pump([
    gulp.src(path.SCSS),
    sass(),
    cleanCSS(),
    concat(path.MINIFIED_CSS),
    gulp.dest(path.DIST),
  ], cb);
});

// Copy public dir into dist
gulp.task('copy-public-prod', function(cb) {
  pump([
    gulp.src(path.PUBLIC),
    gulp.dest(path.DIST_PUBLIC)
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
