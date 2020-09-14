let gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function () {
  return gulp.src('src/css-libs/*.css')
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('src/scss'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions'],
      cascade: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('script', function () {
  return gulp.src('src/js/*.js')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function () {
  return gulp.src('src/js-libs/*.js')
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('export', async function () {
  let buildHtml = gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
  let buildCss = gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('dist/css'))
  let buildJs = gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
  let buildFonts = gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'))
  let buildImages = gulp.src('src/images/**/*.*')
    .pipe(gulp.dest('dist/images'))
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "src/"
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('src/css-libs/*.css', gulp.parallel('css', 'scss'))
  gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'))
  gulp.watch('src/*.html', gulp.parallel('html'))
  gulp.watch('src/js/*.js', gulp.parallel('script'))
});

gulp.task('clean', async function () {
  del.sync('dist')
});

gulp.task('build', gulp.series('clean', 'export'));
gulp.task('default', gulp.parallel('scss', 'js', 'browser-sync', 'watch', 'css'));