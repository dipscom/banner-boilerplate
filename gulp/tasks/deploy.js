var gulp = require('gulp'),
    del  = require('del'),
    runSeq  = require('run-sequence');


// getFolders is used by a bunch of the tasks in 'gulp/tasks'
// TO DO: move it to its own file so it can be referred externally
function getFolders(dir) {
  return fileSystem
  .readdirSync(dir)
  .filter( function(file) {
    return fileSystem.statSync(path.join(dir, file)).isDirectory();
  });
}



gulp.task('deploy', function(done) {
  runSeq('clean-deploy',
         ['compress-images'],
         'zip-folders',
         done);
  /* TO DO:
      Check the compressing of the images, it does not seem to be doing a good job

  */

});


gulp.task('clean-deploy', function() {
  del('deploy/*.*');
});


gulp.task('zip-folders', function() {
  // Zip each ad on its own folder and place them into a 'deploy' folder
  var folders = getFolders('./build/');

  var tasks = folders.map(function(folder) {
    return gulp
      .src(path.join('build/', folder, '/*'))
      .pipe(plugin.zip(folder + '.zip'))
      .pipe(gulp.dest('deploy/'));
    });

  return tasks;
})
