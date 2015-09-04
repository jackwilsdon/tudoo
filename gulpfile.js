var join = require('path').join;

var gulp        = require('gulp'),
    loadPlugins = require('gulp-load-plugins'),
    del         = require('del');

var plugins = loadPlugins(),
    reload  = plugins.connect.reload;

var sourceDirectory = './src',
    devDirectory    = './dev',
    distDirectory   = './dist',
    bowerDirectory  = join(sourceDirectory, 'lib'),
    sourceGlob      = join(sourceDirectory, '**');

gulp.task('clean:dev', function() {
  return del(devDirectory);
});

gulp.task('clean:dist', function() {
  return del(distDirectory);
});

gulp.task('bower', function() {
  return plugins.bower(bowerDirectory).pipe(reload());
});

gulp.task('copy:dev', [ 'clean:dev', 'bower' ], function() {
  return gulp.src(sourceGlob).pipe(gulp.dest(devDirectory)).pipe(reload());
})

gulp.task('copy:dist', [ 'clean:dist', 'bower' ], function() {
  return gulp.src([
    join(bowerDirectory, 'bootstrap', 'dist', 'fonts', '**')
  ]).pipe(gulp.dest(join(distDirectory, 'fonts')));
})

gulp.task('usemin:dist', [ 'clean:dist', 'bower' ], function() {
  return gulp.src(join(sourceDirectory, '**.html')).pipe(plugins.usemin({
    css: [ plugins.minifyCss() ],
    js: [ plugins.uglify() ]
  })).pipe(gulp.dest(distDirectory));
});

gulp.task('sync', function() {
  return gulp.src('bower.json').pipe(plugins.configSync()).pipe(gulp.dest('.'));
});

gulp.task('dev', [ 'clean:dev', 'copy:dev' ]);
gulp.task('dist', [ 'clean:dist', 'copy:dist', 'usemin:dist' ]);

gulp.task('watch:dev', [ 'dev' ], function() {
  return gulp.watch('**', {
    cwd: sourceDirectory
  }, [ 'dev' ]);
});

gulp.task('server:dev', [ 'watch:dev' ], function() {
  return plugins.connect.server({
    livereload: true,
    root: devDirectory
  });
});

gulp.task('default', [ 'dist' ]);
gulp.task('server', [ 'server:dev' ]);
