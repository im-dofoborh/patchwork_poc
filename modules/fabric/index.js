const path = require('path')

/**
 * Fabric client module.
 */
module.exports = function (_modOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.template.js'),
    fileName: 'fabric.js'
  })
}
