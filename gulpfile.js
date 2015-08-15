(function() {
  'use strict';
  var
    gulp = require('gulp'),
    plugin =  require('gulp-load-plugins')({ lazy: true }),
    path = require('path'),
    fileSystem = require('fs'),
    foldersPath = 'src/';

  function getFolders(dir) {
    return fileSystem
      .readdirSync(dir)
      .filter( function(file) {
        return fileSystem.statSync(path.join(dir, file)).isDirectory();
      });
  }

  gulp.task('check', function() {
    // Get the path for the foldersPath
    var folders = getFolders(foldersPath);
    //
    var tasks = folders.map(
      function(folder) {
        return gulp
          .src([path.join(foldersPath, 'shared/*.js'), path.join(foldersPath, folder, '*.js')])
          .pipe(plugin.concat('Main.js'))
          .pipe(dest(path.join('build/', folder)));
    });
    // Check and verify all the JS file against errors
  });

  gulp.task('build', function() {
    // Pick the shared resources
    // Mush it together with the custom resources
    // Rename it to a sensible name
    // Minify it
    // Put it in the build folder
  });

  gulp.tast('default', ['deploy']);
})();
