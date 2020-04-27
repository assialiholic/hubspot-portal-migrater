{
  const CommonMethods = require('./class/CommonMethods.js')
  const $ = new CommonMethods()
  const replaceStr = require('./modules/replaceStr.js')
  const getAllPages = require('./modules/getAllPages.js')
  const updatePages = require('./modules/updatePages.js')

  getAllPages('target')
    .then(res => {
      $.backup(res, $.returnFileName(__filename))
      const replacedJson = replaceStr(res, $.config.replace.page)
      updatePages(replacedJson, 0)
    })
    .catch(err => console.error(err))
}
