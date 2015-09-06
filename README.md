# HTML Banner boilerplate

> Work in progress, still writting this thing up

Base setup for an automated HTML5 banner ad project using Gulp

##Setup
> *Important: If you have not worked with Gulp before you will need to install [NodeJS](https://nodejs.org/) before going any further*.

- First download the zip and extract it in the relevant folder.
- Rename the folder to suit your needs.
- Open your command line tool of choice and navigate to the renamed folder.
- Using npm install Gulp and its dependencies.

The dependencies you will need:
- BrowserSync;
- Del;
- FS;
- Paths;
- Yargs;
- Gulp Concat;
- Gulp If;
- Gulp Imagemin;
- Gulp JSCS;
- Gulp JsHint;
- Gulp Load Plugins;
- Gulp Minfy CSS;
- Gulp Uglify;
- Gulp Zip;

To make is easy, here's a quick copy and paste line to install gulp and the dev dependencies in one go.
> *Assumes you have npm and Gulp installed globally and that you are in the correct folder*:

    npm install --save-dev gulp browser-sync del fs gulp-autoprefixer gulp-concat gulp-if gulp-imagemin gulp-jscs gulp-jshint gulp-load-plugins gulp-minify-css gulp-uglify gulp-zip path yargs

##Usage: 

###Short Version
You will be working from the `src` folder.

The main `index.html` is located in the `shared` folder as are the, aptly named, `Shared.js` and `Shared.css`.

Drop any external JS libraries that are not in approved CDNs in the `libs` folder and create the relevant linkage in the index.html making sure your url is `src="js/YourLibraryName.js"`.


### Long Version
