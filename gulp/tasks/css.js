var gulp = require('gulp')
    fileSystem = require('fs'),
    path = require('path'),
    // TO DO: Move these paths to gulpconfig.js
    foldersPath = 'src/ads/',
    sharedPath  = 'src/shared/',
    browserSync = require('browser-sync').create()
    plugin      =  require('gulp-load-plugins')({ lazy: true });



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
gulp.task('build-css', function() {
  var folders = getFolders(foldersPath);

  var tasks = folders.map(
    function(folder) {
      console.log(sharedPath);
      return gulp.src([
                    path.join(sharedPath, 'css/*.css'),
                    path.join(foldersPath, folder, 'css/*.css')
                  ])
                  .pipe(plugin.concat('styles.css'))
                  .pipe(plugin.autoprefixer({ browsers: ['last 2 versions'] }))
                  // TO DO: Move the minifying to a deploy task
                  // .pipe(plugin.cssnano())
                  .pipe(gulp.dest(path.join('build/', folder)))
                  // TO DO: Move browserSync to a watch task, rather than build
                  .pipe(browserSync.stream());
    });

  return tasks;
});
