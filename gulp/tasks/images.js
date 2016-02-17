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



// Watch
gulp.task('watch-images', ['copy-images'], function(){
  browserSync.reload();
});




// Helpers
gulp.task('compress-images', function() {
  var folders = getFolders(foldersPath);

  var tasks = folders.map(
    function(folder) {
      return gulp
        .src(path.join('build/', folder, './*.{gif,jpg,png,svg}'))
        .pipe(plugin.imagemin())
        .pipe(gulp.dest(path.join('build/', folder)));
    }
  );

  return tasks;
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
