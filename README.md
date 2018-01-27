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
7. npm install --save-dev gulp-babel
8. npm install --save-dev gulp-sass
9. npm install --save-dev browser-sync
10. npm install --save-dev gulp-sourcemaps
11. npm install --save-dev gulp-concat
12. npm install --save-dev gulp-uglify
13. npm install --save-dev gulp-clean-css
14. npm install --save-dev gulp-html-replace
15. npm install --save-dev envify uglify-js uglifyify
16. npm install --save-dev gulp-connect

### Production
Create a production build using the following command:
```bash
 browserify ./dist/src/build.min.js \
    -g [ envify --NODE_ENV production ] \
    -g uglifyify | uglifyjs --compress --mangle > ./bundle.js
```

### References: Getting started
* [React](https://reactjs.org/docs/add-react-to-an-existing-app.html#installing-react)
* [Babel](https://babeljs.io/docs/setup/#installation)
* [Gulp](https://css-tricks.com/gulp-for-beginners/)
* [Building React applications with Gulp and Browserify](https://tylermcginnis.com/react-js-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/)