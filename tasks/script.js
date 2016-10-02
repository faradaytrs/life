var ts = require('gulp-typescript');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var config = require('./config');

var tsProject = ts.createProject("./tsconfig.json");

module.exports = function() {
	var tsResult = gulp.src(config.script.src)
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write(config.script.map))
        .pipe(gulp.dest(config.script.dst));
}
