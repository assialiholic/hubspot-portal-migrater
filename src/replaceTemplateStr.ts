{
  const CommonMethods = require('./class/CommonMethods.js')
  const $ = new CommonMethods()
  const replaceStr = require('./modules/replaceStr.js')
  const getAllTemplates = require('./modules/getAllTemplates.js')
  const updateTemplates = require('./modules/updateTemplates.js')

  getAllTemplates().then(res => {
    $.backup(res, $.returnFileName(__filename))
    const replacedJson = replaceStr(res, $.config.replace.template)
    updateTemplates(replacedJson, 0)
  })
  .catch(error => {
    console.error(error)
  })
}
