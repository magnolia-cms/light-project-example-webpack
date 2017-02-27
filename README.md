# light-project-example-webpack

Example of build setup for a Webpack-based 'light project': a Magnolia project built with light modules.

## Features

* Gets a collection of light modules from npm based on the `dependiencies`.
* Copies the yaml and ftl files.
* Processes the webresources from all modules via webpack. The default process is to concatonate the js and css files into build.js and build.css.


## Usage

* Clone this repository and rename it to your project name - and change the `name` in `package.json`.
* Add desired light modules to `dependencies` in `package.json`.
* Add JS/CSS files to be processed as imports in `_dev/app.js`.
* Tune `webpack.config.js` as desired, for example to add additional directories to process.
* At project root:
```
npm install
npm run build
```

The processed light modules, and a new light module containing `build.js` and `build.css` are in the `dist` directory which can be used as the magnolia resources directory.


## Explanation

Dependencies (the Light Modules) for the build are defined in the
`dependencies` section of the `package.json`.

A light project building two light modules with webpack.
