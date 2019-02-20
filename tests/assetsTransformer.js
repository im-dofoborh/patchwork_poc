/**
 * Transforms assets for testing.
 */
module.exports = {
  process () {
    return `module.exports = JSON.stringify(require('path').basename(fn));`
  }
}
