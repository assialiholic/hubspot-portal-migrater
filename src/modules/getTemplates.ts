{
  const CommonMethods = require('../class/CommonMethods.js')
  const $ = new CommonMethods()

  // 全テンプレートを配列として取得
  module.exports = async function getTemplates(portal: string) {
    const apiKey =
      portal === 'origin' ? $.config.origin.apiKey : $.config.target.apiKey
    const hs = new $.HubSpotClient({ hapikey: apiKey })
    const res: { [key: string]: any } = await hs.templates.getTemplates({
      limit: 1,
    })
    const total: number = res.total
    const allRes: {
      [key: string]: any
    } = await hs.templates.getTemplates({
      limit: total,
    })
    return allRes.objects
  }
}
