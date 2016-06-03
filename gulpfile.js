var gulp          = require('gulp'),
    jshint        = require('gulp-jshint'),
    sass          = require('gulp-sass'),
    cssnano       = require('gulp-cssnano'),
    autoprefixer  = require('gulp-autoprefixer'),
    sourcemaps    = require('gulp-sourcemaps'),
    concat        = require('gulp-concat'),
    browserSync   = require('browser-sync'),
    reload        = browserSync.reload;

// default task to start
gulp.task('default', ['watch', 'serve']);

gulp.task('jshint', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('sass', function() {
  // Browsers taken from Google Web Starter Kit
  const AUTOPREFIXER_BROWSERS = [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
  ];

  return gulp.src('scss/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
      .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/'));
});


gulp.task('build-js', function() {
  return gulp.src('js/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      // uglify if --type p
      .pipe(gutil.env.type === 'p' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js/'));

});


// watch files for changes and reload
gulp.task('serve', ['sass'], function() {
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
 gulp.watch(['scss/*.{scss,css}'], ['sass', reload]);
 gulp.watch(['js/**/*.js'], ['jshint']);
 gulp.watch(['images/**/*'], reload);
});


gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['jshint'] );
  gulp.watch('scss/**/*.scss', ['sass'])
});
