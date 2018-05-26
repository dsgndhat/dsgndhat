var path = require('path')

module.exports = function pathToUrl() {
  // normalizes windows file paths to valid url paths
  return path.join.apply(this, arguments).replace(/\\/g, '/')
}
