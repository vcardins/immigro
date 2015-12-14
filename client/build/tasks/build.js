var gulp = require('gulp');
var fs = require('fs');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var paths = require('../paths');
var ts = require('gulp-typescript');
var Typescript = require("typescript");
var replace = require('gulp-replace-task');

var settings;

// Try to read frontend configuration file, fallback to default file
try {
  settings = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));
} catch (error) {
  settings = JSON.parse(fs.readFileSync('config/config_example.json', 'utf8'));
}

// compiles the typescript files to js
gulp.task('build-ts', function () {
  var tsResult = gulp.src([paths.source, paths.typings])
    .pipe(plumber())
    .pipe(ts({
      target: "es5",
      removeComments: true,
      declarationFiles: false,
      noExternalResolve: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true
    }));
  return tsResult.js.pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

/**
 * Index
 */
gulp.task('index', index);
function index() {
  var opt = {read: false};

  return gulp.src('./client/index.html')
    .pipe(replace({
      patterns: [
        {
          match: 'apiUrl',
          replacement: settings.apiUrl
        }
      ]
    }))
  ;
}
//.pipe(gulp.dest('./.tmp/'))
// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-ts', 'build-html', 'less', 'less-versions', 'assets'],
    callback
  );
});
