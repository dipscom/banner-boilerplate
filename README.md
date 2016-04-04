# HTML Banner boilerplate

> ## Work in progress, still writing this thing up

Base setup for an automated HTML5 banner ad project using Gulp

## Setup:

##### *Important: If you have not worked with Gulp before you will need to install [NodeJS](https://nodejs.org/) before going any further*.


#### If you do not have [NodeJS](https://nodejs.org/) and [Gulp](http://gulpjs.com/) installed globally:
- Download & install [NodeJS](https://nodejs.org/) (It will install npm by default).
- Head to NPM's website and follow their instructions to [make sure it is up to date](https://docs.npmjs.com/getting-started/installing-node) and to make sure the [permissions are correctly set](https://docs.npmjs.com/getting-started/fixing-npm-permissions) - (I tend to use option 2, btw).

- Install Gulp globally:

   ```bash
   npm install -g gulp
   ```

- The required tools should be properly installed. Follow the instructions in the section bellow to setup the boilerplate.


#### If you have [NodeJS](https://nodejs.org/) and [Gulp](http://gulpjs.com/) installed globally:

 - [Download](https://github.com/dipscom/banner-boilerplate/archive/master.zip) the zip and extract it in the folder of your choice.
 - Rename the folder to suit your needs.

   *The default folder name is banner-boilerplate, a good rule of thumb is to rename it to describe what type of ads will go into it. E.g. Standards, Rich, Expanding, etc...*

 - Open your command line tool of choice and navigate to the renamed folder.
   ```bash
   cd your-chosen-directory-path/banner-boilerplate
   ```

 - Run `npm install`.

 - Once all is installed, type the following to see the sample ad that's bundled in this boilerplate

   ```bash
   gulp -f 300x250
    ```

 - You are now done with the setup. See [*Usage*](#usage) bellow to start building your ads.

   *And if this is your first time, read the [Long Version](#longversion) section as well for a in-depth run of how everything is organized*


## <a name="usage"></a>Usage:

### Short Version
This is the default folder structure:

```
|- scr
|  |- ads
|  |   |- 160x600
|  |   |- 300x250
|  |   |- 728x90
|  |
|  |- shared
|      |- css
|      |- fonts
|      |- imgs
|      |- js
|      |- index.html
|
|- node_modules
|- gulpfile.js
|- package.json
|- README.md
```

You will be working from the `src` folder. `node_modules` and the other files are part of the Gulp and Node setup. There is no need to change them a priori. Do feel free to dive in and see how the tasks are organized and drop me a line if you know a better way of doing things.

The main `index.html` is located in the `shared` folder as are the, aptly named, `Shared.js` and `Shared.css`.

Link any CDN-base libraries directly in the `index.html` - By default the sample ad has [Greensock's](http://greensock.com/) TweenMax bundled.

All CSS rules that are shared by all ads should be created in the `Shared.css`.
The same goes for any JavaScript. It goes in the `Shared.js`.

Go ahead and build your first ad, keeping in mind you will use this first one as the basis of all other ads in this group. The easiest way is to simply adapt/resize/rename de sample ad already there.

For each different ad size, create a new folder inside the `ads` folder naming it accordingly (You will need to reference this folder in one of Gulp's task). Eg. 300x250, 160x600, etc...



### <a name="longversion"></a>Long Version
> ## TO DO
