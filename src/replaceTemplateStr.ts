{
  const CommonMethods = require('./class/CommonMethods.js')
  const $ = new CommonMethods()
  const replaceStr = require('./modules/replaceStr.js')
  const getAllTemplates = require('./modules/getAllTemplates.js')
  const updateTemplates = require('./modules/updateTemplates.js')

  const replaceArr = require('./replace.json')

  replaceStr(getAllTemplates, replaceArr)
    .then(res => {
      updateTemplates(res, 0)
    })
    .catch(error => {
      console.error(error)
    })
}
