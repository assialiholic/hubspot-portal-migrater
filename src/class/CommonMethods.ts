class CommonMethods {
  fetch: any
  HubSpotClient: any
  config: any

  constructor() {
    this.fetch = require('node-fetch')
    this.HubSpotClient = require('hubspot-api')
    this.config = require('../../config.json')
  }

  backup(data: any, prefix: string, ext: string = 'json') {
    const fs = require('fs')
    const dirPath = '../backup'
    const flatDate = new Date()
      .toLocaleString('ja-jp', { timeZone: 'Asia/Tokyo' })
      .replace(/[\/ :]/g, '')

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    }
    fs.writeFile(
      `${dirPath}/${prefix}-${flatDate}.${ext}`,
      JSON.stringify(data, null, '  '),
      'utf-8',
      err => {
        if (err) {
          console.log(err)
        }
        console.log(
          `Data is backuped before ${prefix}.js at ${dirPath}/${prefix}-${flatDate}.${ext}`
        )
      }
    )
  }

  returnFileName(abPath: string) {
    return abPath
      .split('/')
      .slice(-1)[0]
      .replace('.js', '')
  }
}

module.exports = CommonMethods
