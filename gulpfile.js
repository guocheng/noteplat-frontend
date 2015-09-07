var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jshint = require('gulp-jshint');
gulp.task('lint', function(){
    return gulp.src('app/src/**')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('watch', function(){
    gulp.watch('app/src/*.jsx', ['lint']);
});
