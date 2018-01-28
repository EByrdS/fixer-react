# fixer-react
A React app that displays a summary of FX rates.

It uses [fixer.io](fixer.io) API
> Fixer is an open-source, simple, and lightweight API for current and
historical foreign exchange (forex) rates published by the European
Central Bank.The API updates rates daily around 4PM CET every working day.
Historical rates go back to 1st January, 1999.

## Disclaimer
This app was created as an individual proyect to understand the groundings
of SPAs, React, SASS, gulp and other dependencies. Due to the large
ammount of information, the tools used may not be fully exploited or may contain
bizarre inconsistencies to the expert eye, comments and Pull Requests are very
much welcomed.

This application comes with **no warranty** of any kind. Its data is obtained
through [fixer.io](fixer.io) which in turn comes with **no warranty** as well.

## Using the app
Once you have access to the code, and have installed `npm` (C9 have it installed
by default), you need only to execute the following commands.

First install `gulp` and `jest`, as they are needed in the process.
```shell
npm install -g gulp
npm install -g jest
```
> NOTE: You may need to prefix `sudo` for this commands to work:
`sudo npm install -g gulp`.

Download the corresponding `npm` packages. These packages are specified in the
`package.json` file. The command will create a `node_modules` directory.
```shell
npm install
```

Create the `dev` folder and open a listening port.
```shell
npm start
```

Or create the production's `dist` folder and open a listening port.
```shell
gulp production
```

### Begin the Test Driven Development (TDD) cycle.
```shell
npm test
```
> NOTE: This npm command is defined in the `package.json`, it will run
`jest --watch`. Changes to `.js` and `.test.js` files will trigger the execution
of their individual tests. Run all test with `jest` or pressing `a` while its
interface is open.

### Development
Build *dev* directory and listen with browserSync:
```shell
npm start
```
This will transform all JSX into JS, and SASS into CSS.
The resulting JS is inserted in a `build.js` file.
The resulting CSS is inserted in a `styles.min.css` file.
The corresponding changes to the `index.html` tags are made automatically.
> NOTE: `npm start` will execute the `gulp` script, which in turn
executes gulp's `'default'` task. You can see this task in the `gulpfile.js`
file. This command behaves exactly as `gulp` or `gulp default`.
A port to listen and display this directory is created
through `browsersync`. The `gulpfile.js` is instructed to refresh all browsers
when there is a change in the `app` directory, getting live feedback o changes.

### Production
Build *dist* directory and listen with browserSync:
```shell
gulp production
```
This will transform all JSX into JS, and SASS into CSS. It will
concatenate and minify all `.js` files into a single `build.min.js` file.
It will also concatenate and minify all `.css` files (previously transformed
from `.scss` files) into a single `styles.min.css` file. The corresponding
changes to the `index.html` file, regarding `<script>` and `<link>` tags are
automatically made to match the created compact version.

## Gulpfile explained
The process of code transformation is carried out with `gulp`, the instructions
are found in the `gulpfile.js` file. The tool
[pump](https://www.npmjs.com/package/pump) is used for easier
debugging of the `gulpfile.js`.

### 'default'
This is the process executed with the shell command `gulp`, in this proyect
it is executed also with `npm start`.

The tasks executed are:
1. `'sass'`
2. `'transform'`
3. `'replaceHTML-dev`
4. `'copy-public-dev'`
5. `'serve'`

### 'sass'
Take all the files in the `app/css` directory with a `.scss` file extension.

The files will be compacted and minified, a sourcemap is needed to debug this
file, otherwise errors will be shown as relative to the minified `.css` file
which are useless for development intentions. This is done with
`sourcemaps.init()` and `sourcemaps.write()`.

Take all `.scss` files and transform them into readable CSS code.

`gulp-clean-css` is used to eliminate unnecesary code in the resulting `.css`
file, making it lighter and thus faster to load for the browser.

Concatenate all the code into a single file called `styles.min.css`. Finally
place this file in the `dev` folder and reload all browsers with `browsersync`
to see their effect.

### 'transform'
A `'watcher'` is created with `watchify` and `browserify`. This watcher needs
only to receive the first `.js` file and will find all the other ones through
the `import` instructions.

All the JSX code is transformed into readable JS with `babelify`. Babelify in
turn uses the presets `react` and `env` (in `package.json`) to know how to
behave.

Debug is set to `true` and the options `cache`, `packageCache` and `fullPaths`
are needed for watchify to properly work.

When there is an `'update'`, the `bundle` function will be executed. This
function contains the same code as the `'transform'` gulp task.

The `'transform'` task creates a "bundle" of these JS files and writes the
output inside the `dev` directory, with the filename `build.js`.

### 'replaceHTML-dev'
As JS and CSS files are concatenated into new compact versions, the `index.html`
file needs to know where they are located and how they are named.

The `index.html` file is taken, and the code inside the `<!-- build:js -->`
and `<!-- build:css -->` tags is changed to point to the correct created files.

### 'copy-public-dev'
This process takes all files inside the `public` directory and copies them
exactly into the `dev` folder.

### 'serve'
A server is connected with `gulp-connect`. `browser-sync` is initialized.

Gulp will watch changes with the `gulp.watch` commands. Changes to SCSS files
will trigger the transformation of SCSS into the single CSS file and reload
browserSync. Changes to JS files trigger only the browserSync to reload, as its
transformation process is handled with the `watcher.on('change', bundle)`
instruction.
Changes to the `index.html` file trigger its copy and tag replacement, followed
by the reload of browserSync.

### 'production'
The production process is very similar to the default.

The JS build process is
different: it will create an uglified version for a lighter file and faster
browser performance.

The CSS does not need sourcemaps for debugging (as debugging is unnecesary in
the production environment), and so they are not created.

The difference of copying the `index.html` and `public` files is only in the
destination directory `dist`.

A server is connected to show files in the `dist` directory and browserSync
initialized. No watching and reloading tasks are used in production.

## App Context
### Creation
You can recreate the behavior of this app by installing its corresponding
packages individually. Packages were managed with `npm`. The app was created
from scratch in a C9 environment, with a 'blank' template.

1. npm install -g gulp
2. npm install -g jest
3. npm init
4. npm install --save react react-dom
5. npm install --save-dev babel-cli babel-preset-env babel-preset-react
6. npm install --save-dev pump
7. npm install --save-dev gulp
8. npm install --save-dev gulp-sass
9. npm install --save-dev browser-sync
10. npm install --save-dev gulp-sourcemaps
11. npm install --save-dev gulp-uglify
12. npm install --save-dev gulp-clean-css
13. npm install --save-dev gulp-html-replace
14. npm install --save-dev gulp-connect
15. npm install --save-dev vinyl-source-stream
16. npm install --save-dev browserify
17. npm install --save-dev watchify
18. npm install --save-dev gulp-streamify
19. npm install --save-dev babelify
20. npm install --save-dev gulp-concat
21. npm install --save-dev babel-jest
22. npm install --save-dev jest
23. npm install --save-dev jest-cli
24. npm install --save-dev enzyme
25. npm install --save-dev enzyme-adapter-react-16
26. npm install --save-dev envify

### References
* [Gettin started with React](https://reactjs.org/docs/add-react-to-an-existing-app.html#installing-react)
* [Getting started with Babel](https://babeljs.io/docs/setup/#installation)
* [Getting started with Gulp](https://css-tricks.com/gulp-for-beginners/)
* [Easier gulpfile debugging with pump](https://www.npmjs.com/package/pump)
* [Building React applications with Gulp and Browserify](https://tylermcginnis.com/react-js-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/)
* [Display and reload the app with Browsersync](https://browsersync.io/)
* [Getting started with Jest](https://facebook.github.io/jest/docs/en/getting-started.html)
* [Expand Jest test suite with Enzyme](http://airbnb.io/enzyme/)
* [Color pallete creation with coolors.co](https://coolors.co/)