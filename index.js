'use strict'
const fs = require('mz/fs')
const ssri = require('ssri')

const MAX_BULK_SIZE = 1 * 1024 * 1024 // 1MB

module.exports = function ssriCheckFile (filename, integrity) {
  if (typeof filename !== 'string') {
    throw new TypeError(`Expected \`filename\` to be of type \`string\`, got \`${typeof filename}\``)
  }
  if (!isStringOrObject(typeof integrity)) {
    throw new TypeError(`Expected \`integrity\` to be of type \`string\` or \`object\`, got \`${typeof integrity}\``)
  }
  return fs.stat(filename).then(stat => {
    if (!stat.isFile()) {
      throw new Error(`Integrity can be checked only for files. ${filename} is not a file.`)
    }

    if (stat.size > MAX_BULK_SIZE) {
      return ssri.checkStream(fs.createReadStream(filename), integrity)
        .catch(err => {
          if (err.code === 'EINTEGRITY') return false
          throw err
        })
    }

    return fs.readFile(filename)
      .then(data => ssri.checkData(data, integrity))
  })
}

function isStringOrObject (type) {
  return type === 'string' || type === 'object'
}
