# HTML Banner boilerplate

> Work in progress, still writting this thing up


<b>Base setup for an automated HTML5 banner ad project using Gulp</b>
_____


<b>Setup</b>
______


<i>Important:</i> If you have not worked with Gulp before you will need to install <a href="https://nodejs.org/">NodeJS</a> before going any further.

- First download the zip and extract it in the relevant folder.
- Rename the folder to suit your needs.
- Open your command line tool of choice and navigate to the renamed folder.
- Using npm install Gulp and its dependencies.

The dependencies you will need are:
- BrowserSync;
- Del;
- FS;
- Paths;
- Yargs;

The Gulp plugins used are:
- Gulp Concat;
- Gulp If;
- Gulp Imagemin;
- Gulp JSCS;
- Gulp JsHint;
- Gulp Load Plugins;
- Gulp Minfy CSS;
- Gulp Uglify;
- Gulp Zip;

To make is easy, here's a quick copy and paste line to install gulp and the dev dependencies in one go. <i>Assumes you have npm and Gulp installed globally and that you are in the correct folder</i>:

    npm install --save-dev gulp browser-sync del fs gulp-concat gulp-if gulp-imagemin gulp-jscs gulp-jshint gulp-load-plugins gulp-minify-css gulp-uglify gulp-zip path yargs

<b>Usage</b>
____


