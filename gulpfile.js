(function() {
  'use strict';
  var
    gulp = require('gulp'),
    plugin =  require('gulp-load-plugins')({ lazy: true }),
    path = require('path'),
    fileSystem = require('fs'),
    del = require('del'),
    // TO DO:
    // Move these paths to gulpconfig.js
    foldersPath = 'src/ads/',
    sharedPath = 'src/shared/';

  function getFolders(dir) {
    return fileSystem
      .readdirSync(dir)
      .filter( function(file) {
        return fileSystem.statSync(path.join(dir, file)).isDirectory();
      });
  }

  gulp.task('copy-js-libs', function(){
    // If there are extra libraries that have to be included
    // These will NOT be concatenated into the main.js file
    var folders = getFolders(foldersPath);

    var tasks = folders.map(
      function(folder) {
        return gulp
        .src(path.join(sharedPath, 'libs/*.js'))
        .pipe(gulp.dest(path.join('build/', folder)));
      }
    );
  });

  gulp.task('build-js', ['copy-js-libs'], function() {
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
        .src([
          path.join(sharedPath, '*css'),
          path.join(foldersPath, folder, 'css/*.css')
        ])
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
        .src(path.join(sharedPath, '*.html'))
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
    // TO DO:
    // Run the clean-deploy task first then, run the build task
    //
    // Zip each ad on its own folder and place them into a 'deploy' folder
    var folders = getFolders('./build/');

    var tasks = folders.map(function(folder) {
      return gulp
        .src(path.join('build/', folder, '/*'))
        .pipe(plugin.zip(folder + '.zip'))
        .pipe(gulp.dest('deploy/'));
      });

    return tasks;
  });

  // gulp.task('watch', function() {
    // TO DO:
    // Watch a selected ad based on an argument passed
    // when starting the task
  // });

  gulp.task('default', ['deploy']);
    // Minify it
    // Zip each folder up
    // Move each of them to a deploy folder
})();
