var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'controllers/**/*.js', 'helpers/**/*.js', 'modules/**/*.js', 'routes/**/*.js'];
var nodeFiles = jsFiles.slice();
nodeFiles.push('views/**/*.jade');
gulp.task('style', function() {
    return gulp.src(jsFiles)
        .pipe(jshint({
            esnext: true
        }))
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});
 
gulp.task('serve', ['style'], function () {
    var options = {
        script: 'bin/www',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: nodeFiles
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');
        });
}); 