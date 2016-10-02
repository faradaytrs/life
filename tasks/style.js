var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var Combine = require('stream-combiner');
var config = require('./config');

module.exports = function() {
	var combined = Combine(
    	    gulp.src(config.style.src),
	        less({
                paths: [
                    '.',
                    './node_modules/bootstrap-less'
                ]
                }),
    	    gulp.dest(config.style.dst)
        );

	combined.on('error', function(err) {
    	console.warn(err.message)
	});

	return combined;
};
