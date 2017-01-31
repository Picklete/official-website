var gulp         = require('gulp'),
    $            = require('gulp-load-plugins')(),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload,
    argv         = require('yargs').argv,
    del          = require('del');

gulp.task('styles', function() {
  return $.rubySass('./src/assets/scss/**/*.{scss,sass}', { style: 'expanded' })
    .pipe($.plumber())
    .pipe($.autoprefixer('last 2 version'))
    .pipe($.cleanCss({
        keepBreaks: { format: 'keep-breaks' },
    }))
    .pipe(gulp.dest('./assets/stylesheets'))
    // .pipe($.notify({ message: 'Styles task complete' }));
});

gulp.task('templates', function() {
  return gulp.src('src/views/*.jade')
        .pipe($.plumber())
        .pipe($.jade({
          pretty: true
        }))
        .pipe(gulp.dest('./src'))

    // .pipe($.notify({ message: 'Templates task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/assets/js/*.js')
    // .pipe($.uglify())
    .pipe(gulp.dest('./assets/scripts'))
    // .pipe($.notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('./assets/images'))
    // .pipe($.notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
  return del.sync(['./index_*.html', './src/i18n', './assets/stylesheets/*.css', './assets/scripts/*.js', './assets/images/**/*']);
});

gulp.task('browser-sync', function() {
  browserSync({
    open: !!argv.open,
    notify: !!argv.notify,
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('translate', ['templates'], function(){
  return gulp.src('./src/index_i18n.html')
    .pipe($.staticI18nHtml({
      files: './src/index_i18n.html',
      allowHtml: true,
      locales: ['en', 'zh'],
      localesPath: './src/locales/',
    }))
    .pipe(gulp.dest('./src/i18n'));
});

gulp.task('translate-rename-and-move-files', ['translate'], $.shell.task([
  'mv ./src/i18n/en/index_i18n.html ./index_en.html',
  'mv ./src/i18n/zh/index_i18n.html ./index_zh.html',
].join(' && ')));

gulp.task('build', ['clean', 'styles', 'templates', 'scripts', 'images', 'translate', 'translate-rename-and-move-files']);

gulp.task('serve', ['clean', 'build', 'browser-sync'], function () {
  gulp.watch('src/assets/scss/**/*.{scss,sass}',['styles', reload]);
  gulp.watch('src/assets/js/**/*.js',['scripts', reload]);
  gulp.watch('src/views/**/*.jade',['templates', 'translate', 'translate-rename-and-move-files', reload]);
  gulp.watch('src/images/**/*',['images', reload]);
});

gulp.task('default', ['serve']);
