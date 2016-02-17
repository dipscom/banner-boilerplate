/*
 *
 *  Rather than manage one giant configuration file responsible
 *  for creating multiple tasks, each task has been broken out into
 *  its own file in gulp/tasks. Any files in that directory get
 *  automatically required below.
 *
 *  To add a new task, simply add a new task file in that directory.
 *
 */

var
    gulp        = require('gulp'),
    requireDir  = require('require-dir');

// Specify global variables.
global.paths = {
    src: './src',
    // out: './bin',

    get scripts() { return this.src + '/**/*.js'; }
    // get jsEntry() { return this.src + '/index'; }
};

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });



// default task
gulp.task('default', ['watch']);
