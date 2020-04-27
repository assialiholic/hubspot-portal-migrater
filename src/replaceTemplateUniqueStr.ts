{
  const CommonMethods = require('./class/CommonMethods.js')
  const $ = new CommonMethods()
  const replaceStr = require('./modules/replaceStr.js')
  const getAllTemplates = require('./modules/getAllTemplates.js')
  const updateTemplates = require('./modules/updateTemplates.js')

  const reaplaceOption: { [key: string]: any }[] = [
    {
      before: $.config.origin.pid,
      after: $.config.target.pid,
    },
    {
      before: $.config.origin.host,
      after: $.config.target.host,
    },
  ]

  getAllTemplates()
    .then(res => {
      $.backup(res, $.returnFileName(__filename))
      const replacedJson = replaceStr(res, reaplaceOption)
      updateTemplates(replacedJson, 0)
    })
    .catch(error => {
      console.error(error)
    })
}
