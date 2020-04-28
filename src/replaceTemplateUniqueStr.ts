{
  const CommonMethods = require('./class/CommonMethods.js')
  const $ = new CommonMethods()
  const replaceStr = require('./modules/replaceStr.js')
  const getTemplates = require('./modules/getTemplates.js')
  const updateTemplates = require('./modules/updateTemplates.js')
  const returnFilePathReplaceArr = require('./modules/returnFilePathReplaceArr.js')

  async function returnTempStrReplacedJson() {
    const targetTemps = await getTemplates()
    $.backup(targetTemps, $.returnFileName(__filename))
    const filePathArr = await returnFilePathReplaceArr()
    const replaceOption = filePathArr.concat([
      {
        before: $.config.origin.pid,
        after: $.config.target.pid,
      },
      {
        before: $.config.origin.host,
        after: $.config.target.host,
      },
    ])
    return replaceStr(targetTemps, replaceOption)
  }

  returnTempStrReplacedJson()
  .then(json => {
    updateTemplates(json, 0)
  })
  .catch(error => {
    console.error(error)
  })
}
