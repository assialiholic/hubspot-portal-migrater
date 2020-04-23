{
  const CommonMethods = require('./class/CommonMethods.js')
  const $ = new CommonMethods()
  const replaceUniqueStr = require('./modules/replaceUniqueStr.js')
  const getAllTemplates = require('./modules/getAllTemplates.js')
  const updateTemplates = require('./modules/updateTemplates.js')

  replaceUniqueStr(getAllTemplates)
    .then(res => {
      updateTemplates(res, 0)
    })
    .catch(error => {
      console.error(error)
    })
}
