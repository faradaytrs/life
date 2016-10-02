var gulp = require('gulp');
var config = require('./config');

module.exports = function () {
    gulp.src(config.copy.src).pipe(gulp.dest(config.copy.dst));
}
