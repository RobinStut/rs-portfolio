const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify')
const concat = require('gulp-concat');

// Gets .html and .nunjucks files in pages
  return gulp.src('app/**/*.js')
    // Renders template with nunjucks
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('script.js'))
    // output files in app folder
    .pipe(gulp.dest('dist'))
