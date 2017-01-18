// Grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    bower = require('gulp-bower'),
    babel = require('gulp-babel'),
    browserSync   = require('browser-sync'),
    reload        = browserSync.reload;

// Compile Sass, Autoprefix and minify
gulp.task('styles', function() {
  return gulp.src('./assets/css/scss/**/*.scss')
    .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
    }))
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css/'))
});

// JSHint, concat, and minify JavaScript
gulp.task('site-js', function() {
  return gulp.src([

           // Grab your custom scripts
  		  './assets/js/*.js'

  ])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
});


// watch files for changes and reload
gulp.task('serve', ['styles'], function() {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', ''],
    port: 3000
  });

 gulp.watch(['**/*.html'], reload);
 gulp.watch(['assets/css/scss/*.{scss,css}'], ['styles', reload]);
 gulp.watch(['assets/js/**/*.js'], ['site-js', reload]);
 gulp.watch(['images/**/*'], reload);
});

// Create a default task
gulp.task('default', function() {
  gulp.start('styles', 'site-js');
});

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['jshint'] );
  gulp.watch('scss/**/*.scss', ['styles'])
});
