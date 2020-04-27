{
  const CommonMethods = require('../class/CommonMethods.js')
  const $ = new CommonMethods()

  module.exports = function updateTemplets(
    pages: any[],
    i: number
  ): boolean | void {
    if (i === pages.length) return false

    const endPoint = new URL(
      `https://api.hubapi.com/content/api/v2/pages/${pages[i].id}`
    )
    endPoint.searchParams.set('hapikey', $.config.target.apiKey)

    $.fetch(endPoint.href, {
      method: 'put',
      body: JSON.stringify(pages[i]),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.name)
      })
      .catch(error => console.error(error))

    setTimeout(() => {
      updateTemplets(pages, ++i)
    }, 200)
  }
}
