{
  const CommonMethods = require('../class/CommonMethods.js')
  const $ = new CommonMethods()
  const endPoint = new URL('https://api.hubapi.com/filemanager/api/v2/files')
  endPoint.searchParams.set('hapikey', $.config.origin.apiKey)

  module.exports = async function getOriginFiles() {
    async function getFiles(limit: string = '1'){
      endPoint.searchParams.set('limit', limit)
      const res = await $.fetch(endPoint.href)
      return await res.json()
    }

    async function getAllFiles() {
      const oneRes = await getFiles()
      const total: number = oneRes.total_count
      const allRes = await getFiles(String(total))
      return allRes.objects
    }
    return await getAllFiles()
  }
}
