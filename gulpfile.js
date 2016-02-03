var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    jshint       = require('gulp-jshint'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer');

//sass
gulp.task('sass', function() {
  return sass('./src/scss/stylesheet.scss', { style: 'compact' })
    .on('error', function (err) { console.log(err.message); })
    .pipe(autoprefixer({
          browsers: ['> 5%', 'last 2 versions', 'Firefox >= 30', 'Opera >= 12', 'Safari >= 5', 'Explorer >= 9'],
        }))
    .pipe(gulp.dest('./dist/css'));
});

//js
gulp.task('js', function() {
  return gulp.src('./src/js/site.js')
    .on('error', function (err) { console.log(err.message); })
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(rename({basename: 'site.min'}))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', function() {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['js']);
});


