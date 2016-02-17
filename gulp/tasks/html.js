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


// Watch
gulp.task('watch-html', ['build-html'], function(){
  browserSync.reload();
});
