var join = require('path').join;

var gulp        = require('gulp'),
    loadPlugins = require('gulp-load-plugins'),
    browserSync = require('browser-sync'),
    del         = require('del');

var plugins = loadPlugins(),
    sync    = browserSync.create();

var sourceDirectory = './src',
    distDirectory   = './dist',
    bowerDirectory  = join(sourceDirectory, 'lib'),
    sourceGlob      = join(sourceDirectory, '**'),
    sourceHtmlGlob  = join(sourceDirectory, '**.html');

gulp.task('clean:dist', function() {
  return del(distDirectory);
});

gulp.task('bower', function() {
  return plugins.bower(bowerDirectory);
});

gulp.task('copy:dist', [ 'bower' ], function() {
  return gulp.src([
    join(bowerDirectory, 'bootstrap', 'dist', 'fonts', '**')
  ]).pipe(gulp.dest(join(distDirectory, 'fonts')));
});

gulp.task('usemin:dist', [ 'bower' ], function() {
  return gulp.src(sourceHtmlGlob).pipe(plugins.usemin({
    css: [ plugins.minifyCss() ],
    js: [ plugins.uglify() ]
  })).pipe(gulp.dest(distDirectory));
});

gulp.task('server', [ 'bower' ], function() {
  sync.init({
    server: {
      baseDir: sourceDirectory
    },
    notify: false,
    open: false
  });

  gulp.watch(sourceGlob).on('change', sync.reload);
});

gulp.task('sync', function() {
  return gulp.src('bower.json').pipe(plugins.configSync()).pipe(gulp.dest('.'));
});

gulp.task('dist', [ 'clean:dist', 'copy:dist', 'usemin:dist' ]);
gulp.task('default', [ 'dist' ]);
