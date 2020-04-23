{
  const nodeFetch = require('node-fetch')
  const HubSpotClient = require('hubspot-api')
  const config = require('./config.json')
  const hsOrigin = new HubSpotClient({ hapikey: config.origin.apiKey })

  // 全ページを配列として取得
  async function getAllOriginPages() {
    const res: { [key: string]: any } = await hsOrigin.pages.getPages({
      limit: 1,
    })
    const total: number = res.total
    const allRes: { [key: string]: any } = await hsOrigin.pages.getPages({
      limit: total,
    })
    return allRes.objects
  }

  // ポータルIDとホストをターゲットポータルのものに書き換える
  async function replaceUniqueStr() {
    const allPageArray: { [key: string]: any }[] = await getAllOriginPages()
    const replacedStr = JSON.stringify(allPageArray)
      .replace(new RegExp(config.origin.pid, 'g'), config.target.pid)
      .replace(new RegExp(config.origin.host, 'g'), config.target.host)
    return JSON.parse(replacedStr)
  }

  const createPageUrl = new URL('https://api.hubapi.com/content/api/v2/pages')
  createPageUrl.searchParams.set('hapikey', config.target.apiKey)
  function createOrUpdatePage(allPages: any[], i: number): boolean | void {
    if (i === allPages.length) return false

    nodeFetch(createPageUrl.href, {
      method: 'post',
      body: JSON.stringify(allPages[i]),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.name)
      })
      .catch(error => console.error(error))

    setTimeout(() => {
      createOrUpdatePage(allPages, ++i)
    }, 200)
  }

  replaceUniqueStr()
    .then(res => {
      createOrUpdatePage(res, 0)
    })
    .catch(error => {
      console.error(error)
    })
}
