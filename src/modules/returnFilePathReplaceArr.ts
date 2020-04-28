{
  const CommonMethods = require('../class/CommonMethods.js')
  const $ = new CommonMethods()
  const getOriginFiles = require('./getOriginFiles.js')

  module.exports = async function returnFilePathReplaceArr() {
    const allFiles = await getOriginFiles()
    const arr = allFiles.map(file => {
      return {
        before: file.url,
        after: file.alt_url,
      }
    })
    return arr
  }
}
