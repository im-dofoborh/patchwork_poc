const path = require('path')

/**
 * Twig module.
 */
module.exports = function (_modOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.template.js'),
    fileName: 'twig.js'
  })
}
