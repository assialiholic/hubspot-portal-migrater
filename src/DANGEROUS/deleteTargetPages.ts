{
  const CommonMethods = require('../class/CommonMethods.js')
  const $ = new CommonMethods()
  const getAllPages = require('../modules/getAllPages.js')
  const hs = new $.HubSpotClient({ hapikey: $.config.target.apiKey })

  function deletePages(
    pages: any[],
    i: number
  ): boolean | void {
    if (i === pages.length) return false

    hs.pages.deletePage(pages[i].id).then(res => console.log(res))

    setTimeout(() => {
      deletePages(pages, ++i)
    }, 100)
  }

  getAllPages('target')
    .then(targetPages => {
      $.backup(targetPages, $.returnFileName(__filename))
      deletePages(targetPages, 0)
    })
    .catch(err => console.error(err))
}
