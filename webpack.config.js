const path = require('path')
const fs = require('fs')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pkg = require('./package.json')
const deps = pkg.dependencies

const LIGHT_MODULE_FOLDERS = [
  'dialogs',
  'templates',
  'decorations',
  'i18n'
]


// constructs:
//  [
//      {from: 'node_modules/mgnl-custom/dialogs', to: 'mgnl-custom/dialogs'}]
//      {from: 'node_modules/mgnl-custom/templates', to: 'mgnl-custom/templates'}]
//      ...
function getFolderPerLightModule (lm) {
  return LIGHT_MODULE_FOLDERS.map((el) => {
    return {
      from: path.join(__dirname, 'node_modules', lm, el),
      to: `${lm}/${el}`
    }
  })
}

function buildDeps (d) {
  return Object.keys(d).reduce((acc, el) => {
    const tmp = getFolderPerLightModule(el)
    const res = acc.concat(tmp)

    return res
  }, []).filter((r) => {
    return fs.existsSync(r.from)
  })
}

module.exports = {
  entry: './_dev/app.js',

  output: {
    filename: pkg.name + '/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new CopyWebpackPlugin(
      buildDeps(deps)
    ),

    new ExtractTextPlugin(pkg.name + '/bundle.css')
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  }
}
