{
  const CommonMethods = require('../class/CommonMethods.js')
  const $ = new CommonMethods()

  module.exports = function updateTemplets(
    temps: any[],
    i: number
  ): boolean | void {
    if (i === temps.length) return false

    const endPoint = new URL(
      `https://api.hubapi.com/content/api/v2/templates/${temps[i].id}`
    )
    endPoint.searchParams.set('hapikey', $.config.target.apiKey)

    $.fetch(endPoint.href, {
      method: 'put',
      body: JSON.stringify(temps[i]),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.filename)
      })
      .catch(error => console.error(error))

    setTimeout(() => {
      updateTemplets(temps, ++i)
    }, 200)
  }
}
