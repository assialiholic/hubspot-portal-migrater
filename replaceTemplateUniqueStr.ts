{
  const CommonMethods = require('./class/CommonMethods.js')
  const $ = new CommonMethods()
  const replaceUniqueStr = require('./modules/replaceUniqueStr.js')
  const hsTarget = new $.HubSpotClient({ hapikey: $.config.target.apiKey })

  // 全テンプレートを配列として取得
  async function getAllTemps() {
    const res: { [key: string]: any } = await hsTarget.templates.getTemplates({
      limit: 1,
    })
    const total: number = res.total
    const allRes: {
      [key: string]: any
    } = await hsTarget.templates.getTemplates({
      limit: total,
    })
    return allRes.objects
  }

  function updateTemp(temps: any[], i: number): boolean | void {
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
      updateTemp(temps, ++i)
    }, 200)
  }

  replaceUniqueStr(getAllTemps)
    .then(res => {
      updateTemp(res, 0)
    })
    .catch(error => {
      console.error(error)
    })
}
