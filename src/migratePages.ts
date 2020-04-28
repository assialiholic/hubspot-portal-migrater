{
  const CommonMethods = require('./class/CommonMethods.js')
  const $ = new CommonMethods()
  const replaceStr = require('./modules/replaceStr.js')
  const getAllPages = require('./modules/getAllPages.js')
  const returnFilePathReplaceArr = require('./modules/returnFilePathReplaceArr.js')

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
    }, 100)
  }

  async function returnStrReplacedJson() {
    const originPages = await getAllPages('origin')
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
    return replaceStr(originPages, replaceOption)
  }

  returnStrReplacedJson()
    .then(json => {
      createPage(json, 0)
    })
    .catch(error => {
      console.error(error)
    })
}
