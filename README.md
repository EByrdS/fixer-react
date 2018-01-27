# fixer-react
A React app that displays a summary of FX rates.

It uses [fixer.io](fixer.io) API
> Fixer is an open-source, simple, and lightweight API for current and
historical foreign exchange (forex) rates published by the European
Central Bank.The API updates rates daily around 4PM CET every working day.
Historical rates go back to 1st January, 1999.

### Disclaimer
This app was created as an individual proyect to understand the groundings
of SPAs, React, SASS, gulp and other dependencies. Due to the large
ammount of information, the tools used may not be fully exploited or may contain
bizarre inconsistencies to the expert eye, comments and Pull Requests are very
much welcomed.

This application comes with **no warranty** of any kind. Its data is obtained
through [fixer.io](fixer.io) which in turn comes with **no warranty** as well.

### Creation
This application was created with the following commands, in a C9 environment
1. npm init
2. npm install --save react react-dom
3. npm install --save-dev babel-cli babel-preset-env babel-preset-react
4. sudo npm install gulp -g
5. npm install --save-dev pump
6. npm install --save-dev gulp
7. npm install --save-dev gulp-sass
8. npm install --save-dev browser-sync
9. npm install --save-dev gulp-sourcemaps
10. npm install --save-dev gulp-uglify
11. npm install --save-dev gulp-clean-css
12. npm install --save-dev gulp-html-replace
13. npm install --save-dev gulp-connect
14. npm install --save-dev vinyl-source-stream
15. npm install --save-dev browserify
16. npm install --save-dev watchify
17. npm install --save-dev gulp-streamify
18. npm install --save-dev babelify
19. npm install --save-dev gulp-concat
20. npm install -g jest
21. npm install --save-dev babel-jest
22. npm install --save-dev jest
23. npm install --save-dev jest-cli

### Development
Build *dev* directory and listen with browserSync:
```bash
npm start
```
This will transform all JSX into JS, and SASS into CSS.
The resulting JS is inserted in a `build.js` file.
The resulting CSS is inserted in a `styles.min.css` file.
The corresponding changes to the `index.html` tags are made automatically.
> NOTE: `npm start` will execute the `gulp` script, which in turn
executes gulp's `'default'` task. You can see this task in the `gulpfile.js`
file. This command behaves exactly as `gulp` or `gulp default`.

### Production
Build *dist* directory and listen with browserSync:
```bash
gulp production
```
This will transform all JSX into JS, and SASS into CSS. It will
concatenate and minify all `.js` files into a single `build.min.js` file.
It will also concatenate and minify all `.css` files (previously transformed
from `.scss` files) into a single `styles.min.css` file. The corresponding
changes to the `index.html` file, regarding `<script>` and `<link>` tags are
automatically made to match the created compact version.

### References: Getting started
* [React](https://reactjs.org/docs/add-react-to-an-existing-app.html#installing-react)
* [Babel](https://babeljs.io/docs/setup/#installation)
* [Gulp](https://css-tricks.com/gulp-for-beginners/)
* [Building React applications with Gulp and Browserify](https://tylermcginnis.com/react-js-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/)