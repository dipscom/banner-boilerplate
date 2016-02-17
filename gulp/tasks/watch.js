var gulp = require('gulp'),
    browserSync = require('browser-sync').create();





// Main Watch
gulp.task('watch', ['build'], function() {
  // TO DO: 'build' is not being run
  // TO DO: dest has to be mandatory or have a default folder.
  var argv = require('yargs')
    .usage('\nError.\nYou have to specify the folder of the unit you want Gulp to watch.\nE.g: gulp -f 300x250')
    .demand(['f'])
    .argv;

  var dest = 'build/' + argv.f;
  console.log("Watching folder: ", argv.f, dest);
  browserSync.init({
    server: dest
  });

  // TO DO: This does not seem to be watching all image folders
  gulp.watch('src/**/*.{gif,jpg,png,svg}', ['watch-images']);
  gulp.watch('src/**/*.css', ['build-css']);
  gulp.watch('src/**/*.html', ['watch-html']);
  gulp.watch('src/**/*.js', ['watch-js']);
});
