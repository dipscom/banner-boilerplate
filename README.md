# HTML Banner boilerplate

> ## Work in progress, still writing this thing up

Base setup for an automated HTML5 banner ad project using Gulp

## Setup:

##### *Important: If you have not worked with Gulp before you will need to install [NodeJS](https://nodejs.org/) before going any further*.


#### If you have [NodeJS](https://nodejs.org/) and [Gulp](http://gulpjs.com/) installed globally:

 - Download the zip and extract it in the folder of your choice.
 - Rename the folder to suit your needs.

 *The default folder name is banner-boilerplate, a good rule of thumb is to rename it to describe what type of ads will go into it. E.g. Standards, Rich, Expanding, etc...*

 - Open your command line tool of choice and navigate to the renamed folder.

 `cd your-chosen-directory-path/banner-boilerplate`
 - Run `npm install`.
 - You are now done with the setup, see *Usage* bellow to start building your ads.

 *And if this is your first time, read the Long Version section as well for a in-depth run of how everything is organized*


#### If you do not have [NodeJS](https://nodejs.org/) and [Gulp](http://gulpjs.com/) installed globally:
 - Install [NodeJS](https://nodejs.org/) (It will install npm by default).
 - Run `npm install -g gulp` (This will install Gulp globally).
 - Run `npm install` (This will install Gulp and dependencies for your project).



## Usage:

### Short Version
You will be working from the `src` folder.

The main `index.html` is located in the `shared` folder as are the, aptly named, `Shared.js` and `Shared.css`.

Drop any external JS libraries that are not in approved CDNs in the `libs` folder and create the relevant linkage in the index.html making sure your url is `src="js/YourLibraryName.js"`.
Link any CDN-base libraries directly in the `index.html` - By default the sample ad has [Greensock's](http://greensock.com/) TweenMax bundled.

All CSS rules that are shared by all ads should be created in the `Shared.css`.
The same goes for any JavaScript. It goes in the `Shared.js`.

Go ahead and build your first ad, keeping in mind you will use this first one as the basis of all other ads in this group. The easiest way is to simply adapt/resize/rename de sample ad already there.

For each different ad size, create a new folder inside the `ads` folder naming it accordingly (You will need to reference this folder in one of Gulp's task). Eg. 300x250, 160x600, etc...



### Long Version
> ## TO DO
