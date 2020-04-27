{
  const CommonMethods = require('./class/CommonMethods.js')
  const $ = new CommonMethods()
  const replaceUniqueStr = require('./modules/replaceUniqueStr.js')
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

  replaceUniqueStr(() => getAllPages('origin'))
    .then(res => {
      createPage(res, 0)
    })
    .catch(error => {
      console.error(error)
    })
}
