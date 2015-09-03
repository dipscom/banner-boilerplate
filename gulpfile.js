(function() {
  'use strict';
  var
    argv = require('yargs')
      .usage('Usage: -f [string]')
      // .demand(['f'])
      .argv,
    browserSync = require('browser-sync').create(),
    del = require('del'),
    fileSystem = require('fs'),
    gulp = require('gulp'),
    path = require('path'),
    plugin =  require('gulp-load-plugins')({ lazy: true }),
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
          .pipe(plugin.if(argv.production, plugin.uglify()))
          .pipe(gulp.dest(path.join('build/', folder)));
        }
    );

    return tasks;
  });

  gulp.task('watch-js', ['build-js'], function(){
    // TO DO:
    // Make it so it is not needed to copy all
    // external JS libraries on each reload
    browserSync.reload();
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
        .pipe(plugin.if(argv.production, plugin.minifyCss()))
        .pipe(gulp.dest(path.join('build/', folder)))
        .pipe(browserSync.stream());
      }
    );

    return tasks;
  });

  gulp.task('watch-html', ['build-html'], function(){
    browserSync.reload();
  });
  
  gulp.task('copy-shared-images', function() {
    var folders = getFolders(foldersPath);

    var tasks = folders.map(
      function(folder) {
        return gulp
        .src(path.join(sharedPath, 'imgs/*.*'))
        .pipe(gulp.dest(path.join('build/', folder)));
      }
    );
  });

  gulp.task('compress-images', ['copy-shared-images'], function() {
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

  gulp.task('build', [ 'clean-build', 'compress-images', 'build-html', 'build-css', 'build-js' ]);

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

  gulp.task('watch',['build'], function() {
    var dest = 'build/' + argv.f;
    console.log("Watching folder: ", argv.f, dest);
    browserSync.init({
      server: dest});

    gulp.watch('src/**/*.css', ['build-css']);
    gulp.watch('src/**/*.html', ['watch-html']);
    gulp.watch('src/**/*.js', ['watch-js']);
  });

  gulp.task('default', ['deploy']);
    // Minify it
    // Zip each folder up
    // Move each of them to a deploy folder
})();
