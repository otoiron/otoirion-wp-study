const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const srcPath = {
  css: './src/assets/scss/**/*.scss',
  php: './wp-content/themes/**/*.php',
};

const destPath = {
  css: './dist/assets/css/',
};

const compSass = () => {
  return (
    gulp
      .src(srcPath.css, {
        sourcemaps: true,
      })
      .pipe(
        plumber({
          errorHandler: notify.onError('Error!!:<%= error.message %>'),
        })
      )
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(gulp.dest(destPath.css), { sourcemaps: './' })
      .pipe(browserSync.stream())
  );
};

const browserSyncFunc = () => {
  browserSync.init(browserSyncOption);
};

const browserSyncOption = {
  proxy: 'http://localhost:10003/',
  open: 'true',
  watchOptions: {
    debounceDelay: 1000,
  },
  reloadOnRestart: true,
};

const browserSyncReload = (done) => {
  browserSync.reload();
  done();
};

const watchFiles = () => {
  gulp.watch(srcPath.css, gulp.series(compSass, browserSyncReload));
  gulp.watch(srcPath.php, gulp.series(browserSyncReload));
};

exports.default = gulp.series(
  gulp.parallel(compSass),
  gulp.parallel(watchFiles, browserSyncFunc)
);
