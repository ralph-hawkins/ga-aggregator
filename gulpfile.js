var gulp = require('gulp');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');

gulp.task('connect', function(){
  connect.server({
    root: '.',
    livereload: true
  });
});

// html task
// specify where our html files are
// and what to do when they change
gulp.task('html', function(){
  gulp.src('./*html').pipe(connect.reload());
});

//css task
gulp.task('css', function(){
  gulp.src('./css/*.css').pipe(connect.reload());
});

//js task
gulp.task('js', function(){
  gulp.src('./js/*.js').pipe(connect.reload());
});

// watch task
// specify where certain files are
// and the task to run when they change

gulp.task('jshint', function(){
  gulp.src('./js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('watch', function(){
  gulp.watch(['./*.html'], ['html']);
  gulp.watch(['./css/*.css'], ['css']);
  gulp.watch(['./js/*.js'], ['jshint']);
});

gulp.task('default', ['connect', 'watch']);