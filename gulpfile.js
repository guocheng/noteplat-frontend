var gulp = require('gulp');

var eslint = require('gulp-eslint');

gulp.task('lint', function(){
    return gulp.src('app/src/*.jsx')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('watch', function(){
    gulp.watch('app/src/*.jsx', ['lint']);
});
