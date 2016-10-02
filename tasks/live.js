var gulp = require('gulp');
var config = require('./config');

var livereload = require('gulp-livereload');

function liveReload() {
    var timer = null;
    function stackReload() {
        var reload_args = arguments;
        // Stop timeout function to run livereload if this function is ran within the last 250ms
        if (timer) clearTimeout(timer);

        // Check if any gulp task is still running
        if (!gulp.isRunning) {
            timer = setTimeout(function() {
                livereload.changed.apply(null, reload_args);
            }, 250);
        };
    }

    return stackReload;
}

module.exports = function() {
    livereload.listen();
    gulp.watch(config.watch.less, ['style'])
    gulp.watch(config.watch.ts, ['script']);

    var stackReload = liveReload();
    gulp.watch(config.watch.css).on('change', stackReload);
}
