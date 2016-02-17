var gulp = require('gulp'),
    fileSystem = require('fs'),
    path = require('path'),
    // TO DO: Move these paths to gulpconfig.js
    foldersPath = 'src/ads/',
    sharedPath  = 'src/shared/';


// getFolders is used by a bunch of the tasks in 'gulp/tasks'
// TO DO: move it to its own file so it can be referred externally
function getFolders(dir) {
  return fileSystem
  .readdirSync(dir)
  .filter( function(file) {
    return fileSystem.statSync(path.join(dir, file)).isDirectory();
  });
}


// Build
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
        // TO DO: move the minifying to a deploy task
        // .pipe(plugin.uglify())
        .pipe(gulp.dest(path.join('build/', folder)));
      }
  );

  return tasks;
});




// Watch
gulp.task('watch-js', ['build-js'], function(){
  // TO DO:
  // Make it so it is not needed to copy all
  // external JS libraries on each reload
  browserSync.reload();
});




// Helpers
gulp.task('copy-js-libs', function(){
  // TO DO: IS THIS NEEDED ANYMORE?
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
