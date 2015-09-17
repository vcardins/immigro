var gulp = require('gulp');
var del = require('del');
var util = require('gulp-util');
var $ = require('gulp-load-plugins')({lazy: true});
var colors = util.colors;
var envenv = util.env;
var paths = require('../paths');

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                util.log(colors.blue(msg[item]));
            }
        }
    } else {
        util.log(colors.blue(msg));
    }
}


/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    log('Cleaning: ' + util.colors.blue(path));
    del(path, done);
}

/**
 * Remove all fonts from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-fonts', function(done) {
    clean([].concat(paths.output + 'fonts'), done);
});

/**
 * Remove all images from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-images', function(done) {
    clean([].concat(paths.output + 'images'), done);
});


/**
 * Copy fonts
 * @return {Stream}
 */
gulp.task('fonts', ['clean-fonts'], function() {
    log('Copying fonts');
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.output + 'fonts'));
});

/**
 * Compress images
 * @return {Stream}
 */
gulp.task('images', ['clean-images'], function() {
    var dest = paths.output + 'images';
    log('Compressing and copying images');
    return gulp.src(paths.images)
        // .pipe($.imagemin({
        //     optimizationLevel: 3
        // }))
        .pipe(gulp.dest(dest));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('assets', ['fonts', 'images'], function() {
    log(util.colors.blue('Loaded assets'));
});
