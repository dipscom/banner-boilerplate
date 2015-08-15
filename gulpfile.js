(function() {
  'use strict';
  var
    gulp = require('gulp'),
    plugin =  require('gulp-load-plugins')({ lazy: true });

  gulp.task('check', function() {
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
