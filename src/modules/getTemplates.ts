{
  const CommonMethods = require('../class/CommonMethods.js')
  const $ = new CommonMethods()
  const hsTarget = new $.HubSpotClient({ hapikey: $.config.target.apiKey })

  // 全テンプレートを配列として取得
  module.exports = async function getTemplates() {
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
}
