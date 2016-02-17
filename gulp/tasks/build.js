var gulp = require('gulp'),
    del  = require('del');

// Build
gulp.task('build', [
  'clean-build',
  'copy-images',
  'build-html',
  'build-css',
  'build-js',
  'copy-fonts'
]);


gulp.task('clean-build', function() {
  del('build/**/*.*');
  /*
  TO DO
  Figure out a way to call the following
  compress-images, build-html, build-css, build-js
  once the del task is completed
  */
});
