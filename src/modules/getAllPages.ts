{
  const CommonMethods = require('../class/CommonMethods.js')
  const $ = new CommonMethods()

  // 全ページを配列として取得
  module.exports = async function getAllOriginPages(portal) {
    const apiKey =
      portal === 'origin' ? $.config.origin.apiKey : $.config.target.apiKey
    const hs = new $.HubSpotClient({ hapikey: apiKey })
    const res: { [key: string]: any } = await hs.pages.getPages({
      limit: 1,
    })
    const total: number = res.total
    const allRes: { [key: string]: any } = await hs.pages.getPages({
      limit: total,
    })
    return allRes.objects
  }
}
