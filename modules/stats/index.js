const path = require('path')

/**
 * Stats module.
 */
module.exports = function (_modOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.template.js'),
    fileName: 'stats.js'
  })
}
