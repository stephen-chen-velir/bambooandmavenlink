var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'controllers/**/*.js', 'helpers/**/*.js', 'modules/**/*.js', 'routes/**/*.js'];
//sass files that trigger the sass files to be compiled.
var sassWatchFiles = ["./public/sass/**/*.scss"];
//the sass files that will be compiled.  
var sassBuildFiles = ["./public/sass/*.scss"];
var nodeFiles = jsFiles.slice();
nodeFiles.push('views/**/*.jade');
nodeFiles = nodeFiles.concat(sassBuildFiles);

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

gulp.task('sass', function() {
    return gulp.src(sassBuildFiles)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('sass:watch', function() {
    gulp.watch(sassWatchFiles, ['sass']);
});

gulp.task('serve', ['style', 'sass:watch'], function () {
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