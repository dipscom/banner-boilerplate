(function() {
  'use strict';
  var
    browserSync = require('browser-sync').create(),
    del = require('del'),
    fileSystem = require('fs'),
    f,
    gulp = require('gulp'),
    path = require('path'),
    plugin =  require('gulp-load-plugins')({ lazy: true }),
    runSequence = require('run-sequence'),

    // TO DO: Move these paths to gulpconfig.js
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
            path.join(sharedPath, '/js/*.js'),
            path.join(foldersPath, folder, 'js/*.js')
          ])
          .pipe(plugin.concat('main.js'))
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
        return gulp.src([
                      path.join(sharedPath, 'css/*.css'),
                      path.join(foldersPath, folder, 'css/*.css')
                    ])
                    .pipe(plugin.concat('styles.css'))
                    .pipe(plugin.autoprefixer({ browsers: ['last 4 versions'] }))
                    // TO DO: Move the minifying to a deploy task
                    // .pipe(plugin.cssnano())
                    .pipe(gulp.dest(path.join('build/', folder)))
                    .pipe(browserSync.stream());
      });

    return tasks;
  });




  gulp.task('compress-css', function() {
    var folders = getFolders(foldersPath);

    var tasks = folders.map(
      function(folder) {
        return gulp.src([
                      path.join('build', folder, './*.css')
                    ])
                    .pipe(plugin.cssnano())
                    .pipe(gulp.dest(path.join('deploy/', folder)))
      });

    return tasks;
  });



  gulp.task('compress-js', function() {
    var folders = getFolders(foldersPath);

    var tasks = folders.map(
      function(folder) {
        return gulp.src([
                      path.join('build', folder, './*.js')
                    ])
                    .pipe(plugin.uglify())
                    .pipe(gulp.dest(path.join('deploy/', folder)));
        }
    );

    return tasks;
  });


  gulp.task('compress-images', function() {
    var folders = getFolders(foldersPath);

    var tasks = folders.map(
      function(folder) {
        return gulp
          .src(path.join('build/', folder, './*.{gif,jpg,png,svg}'))
          .pipe(plugin.imagemin())
          .pipe(gulp.dest(path.join('deploy/', folder)));
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




  gulp.task('copy-images', ['copy-shared-images'], function() {
    var folders = getFolders(foldersPath);

    var tasks = folders.map(
      function(folder) {
        return gulp
          .src(path.join(foldersPath, folder, '/imgs/*.*'))
          .pipe(gulp.dest(path.join('build/', folder)));
      }
    );

    return tasks;
  });




  gulp.task('watch-images', ['copy-images'], function(){
    browserSync.reload();
  });






  gulp.task('copy-fonts', function() {
    var folders = getFolders(foldersPath);

    var tasks = folders.map(
      function(folder) {
        return gulp.src(path.join(sharedPath, '/fonts/*.*'))
                   .pipe(gulp.dest(path.join('build/', folder)));
      });

    return tasks;
  });




  gulp.task('clean-build', function() {
    return del('build/*');
  });




  gulp.task('build', ['clean-build'], function() {
    return runSequence(['copy-images', 'build-html', 'build-css', 'build-js', 'copy-fonts']);
  });




  gulp.task('zip', function() {
    var folders = getFolders('./build/');

    var tasks = folders.map(function(folder) {
      return gulp
        .src(path.join('deploy/', folder, '/*'))
        .pipe(plugin.zip(folder + '.zip'))
        .pipe(gulp.dest('deploy/'));
      });

    return tasks;
  })




  gulp.task('clean-deploy', function() {
    return del('deploy/*');
  });




  gulp.task('deploy', ['clean-deploy'], function() {
    return runSequence(['compress-images', 'compress-js', 'compress-css'], 'zip');
  });




  gulp.task('watch', function(){
    var dest = 'build/' + f;

    console.log("Watching folder: ", f, dest);

    browserSync.init({
      server: dest
    });

    gulp.watch('src/**/*.{gif,jpg,png,svg}', ['watch-images']);
    gulp.watch('src/**/*.css', ['build-css']);
    gulp.watch('src/**/*.html', ['watch-html']);
    gulp.watch('src/**/*.js', ['watch-js']);
  });




  gulp.task('default', function(callback) {

    var argv = require('yargs')
        .usage('Usage: -f [folder name]')
        .demand(['f'])
        .argv;

    if(argv.f === true) {
      console.log('--------------------------\nERROR: -f cannot be empty\n\nUsage: gulp -f folderName\n^^^^^^^^^^^^^^^^^^^^^^^^^');
      return;
    } else {
      f = argv.f;
      runSequence('build', 'watch', callback);
    }
  });



})();
