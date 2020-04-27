{
  const CommonMethods = require('./class/CommonMethods.js')
  const $ = new CommonMethods()
  const replaceStr = require('./modules/replaceStr.js')
  const getAllPages = require('./modules/getAllPages.js')

  const createPageUrl = new URL('https://api.hubapi.com/content/api/v2/pages')
  createPageUrl.searchParams.set('hapikey', $.config.target.apiKey)
  function createPage(pages: any[], i: number): boolean | void {
    if (i === pages.length) return false

    $.fetch(createPageUrl.href, {
      method: 'post',
      body: JSON.stringify(pages[i]),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.name)
      })
      .catch(error => console.error(error))

    setTimeout(() => {
      createPage(pages, ++i)
    }, 200)
  }

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

  getAllPages('origin')
    .then(res => {
      const replacedJson = replaceStr(res, reaplaceOption)
      createPage(replacedJson, 0)
    })
    .catch(error => {
      console.error(error)
    })
}
