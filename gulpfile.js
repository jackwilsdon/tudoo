var join = require('path').join;

var gulp        = require('gulp'),
    loadPlugins = require('gulp-load-plugins');
    del         = require('del');

var plugins = loadPlugins({
  rename: {
    'gulp-server-livereload': 'server'
  }
});

var sourceDirectory = './src',
    devDirectory    = './dev',
    distDirectory   = './dist',
    bowerDirectory  = join(sourceDirectory, 'lib');

function cleanTask(glob) {
  return function() {
    return del(glob);
  };
}

gulp.task('clean:dev', cleanTask(devDirectory));
gulp.task('clean:dist', cleanTask(distDirectory));

gulp.task('bower', function() {
  return plugins.bower(bowerDirectory);
});

gulp.task('copy:dev', [ 'clean:dev', 'bower' ], function() {
  return gulp.src(join(sourceDirectory, '**')).pipe(gulp.dest(devDirectory));
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

gulp.task('dev', [ 'clean:dev', 'bower', 'copy:dev' ]);
gulp.task('dist', [ 'clean:dist', 'usemin:dist' ]);

gulp.task('server:dev', [ 'dev' ], function() {
  return gulp.src(devDirectory).pipe(plugins.server({
    livereload: {
      enable: true,
      clientConsole: true
    }
  }));
});

gulp.task('default', [ 'dist' ]);
