var ts = require('gulp-typescript');
var gulp = require('gulp');
var config = require('./config');

var tsProject = ts.createProject("./tsconfig.json");

module.exports = function() {
	var tsResult = gulp.src(config.script.src)
        .pipe(tsProject())
        .pipe(gulp.dest(config.script.dst));
};
