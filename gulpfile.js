(function() {
  'use strict';
  var
    gulp = require('gulp'),
    plugin =  require('gulp-load-plugins')({ lazy: true }),
    path = require('path'),
    fileSystem = require('fs'),
    del = require('del'),
    foldersPath = 'src/ads/',
    sharedPath = 'src/shared/';

  function getFolders(dir) {
    return fileSystem
      .readdirSync(dir)
      .filter( function(file) {
        return fileSystem.statSync(path.join(dir, file)).isDirectory();
      });
  }

  gulp.task('build-js', function() {
    var folders = getFolders(foldersPath);

    var tasks = folders.map(
      function(folder) {
        return gulp
          .src([
            path.join(sharedPath, '*js'),
            path.join(foldersPath, folder, 'js/*.js')
          ])
          .pipe(plugin.concat('main.js'))
          .pipe(gulp.dest(path.join('build/', folder)));
        }
    );

    return tasks;
  });

  gulp.task('build-css', function() {
    var folders = getFolders(foldersPath);

    var tasks = folders.map(
      function(folder) {
        return gulp
          .src(path.join(foldersPath, folder, 'css/*.css'))
          .pipe(plugin.concat('styles.css'))
          .pipe(gulp.dest(path.join('build/', folder)));
        }
    );

    return tasks;
  });

  gulp.task('build-html', function() {
    var folders = getFolders(foldersPath);

    var tasks = folders.map(
      function(folder) {
        return gulp
          .src(path.join(foldersPath, folder, '*.html'))
          .pipe(gulp.dest(path.join('build/', folder)));
        }
    );

    return tasks;
  });

  gulp.task('compress-images', function() {
    var folders = getFolders(foldersPath);

    var tasks = folders.map(
      function(folder) {
        return gulp
          .src(path.join(foldersPath, folder, '/imgs/*.*'))
          .pipe(plugin.imagemin())
          .pipe(gulp.dest(path.join('build/', folder)));
      }
    );

    return tasks;
  });

  gulp.task('clean-build', function() {
    del('build/**/*.*');
    /*
    TO DO
    Figure out a way to call the following
    compress-images, build-html, build-css, build-js
    once the del task is completed
    */
  });

  gulp.task('clean-deploy', function() {
    del('deploy/*.*');
  });

  gulp.task('build', [ 'clean-build', 'compress-images', 'build-html', 'build-css', 'build-js', 'compress-images' ]);

  gulp.task('deploy', [ 'clean-deploy' ], function() {
    var folders = getFolders('./build/');
    //
    var tasks = folders.map(function(folder) {
      return gulp
        .src(path.join('build/', folder, '/*'))
        .pipe(plugin.zip(folder + '.zip'))
        .pipe(gulp.dest('deploy/'));
      });

    return tasks;
  });

  // gulp.task('build', function() {
    // Pick the shared resources
    // Mush it together with the custom resources
    // Rename it to a sensible name
    // Put it in the build folder
  // });

  gulp.task('default', ['deploy']);
    // Minify it
    // Zip each folder up
    // Move each of them to a deploy folder
})();
