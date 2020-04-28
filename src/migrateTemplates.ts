{
  const CommonMethods = require('./class/CommonMethods.js')
  const $ = new CommonMethods()
  const replaceStr = require('./modules/replaceStr.js')
  const getTemplates = require('./modules/getTemplates.js')
  const returnFilePathReplaceArr = require('./modules/returnFilePathReplaceArr.js')

  const createTempsUrl = new URL(
    'https://api.hubapi.com/content/api/v2/templates'
  )
  createTempsUrl.searchParams.set('hapikey', $.config.target.apiKey)
  function createTemps(temps: any[], i: number): boolean | void {
    if (i === temps.length) return false

    $.fetch(createTempsUrl.href, {
      method: 'post',
      body: JSON.stringify(temps[i]),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.filename)
      })
      .catch(error => console.error(error))

    setTimeout(() => {
      createTemps(temps, ++i)
    }, 100)
  }

  async function returnStrReplacedJson() {
    const originTemps = await getTemplates('origin')
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
    return replaceStr(originTemps, replaceOption)
  }

  returnStrReplacedJson()
    .then(json => {
      // createTemps(json, 0)
    })
    .catch(error => {
      console.error(error)
    })
}
