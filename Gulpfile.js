var gulp = require('gulp');
var tasks = ['copy', 'style', 'script'];
tasks.forEach(task => {
    gulp.task(task, require('./tasks/' + task));
});
gulp.task('build', tasks);
gulp.task('default', ['build'], require('./tasks/live'));
