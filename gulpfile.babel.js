const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const replace = require('gulp-replace')
const cssmin = require('gulp-cssmin')
gulp.task('sass', () => {
  gulp.src('./src/**/*.scss')
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'))

  gulp.src('lib/**/*.js')
    .pipe(replace('.scss', '.css'))
    .pipe(gulp.dest('lib'))
})

gulp.task('copyfont', function() {
  return gulp.src('./src/Fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/Fonts'))
});
gulp.task('build', ['sass', 'copyfont'])