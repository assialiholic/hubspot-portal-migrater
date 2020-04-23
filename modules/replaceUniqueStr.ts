{
  const CommonMethods = require('../class/CommonMethods.js')
  const $ = new CommonMethods()
  
  // ポータルIDとホストをターゲットポータルのものに書き換える
  module.exports = async function replaceUniqueStr(fn) {
    const all: { [key: string]: any }[] = await fn()
    const replacedStr = JSON.stringify(all)
      .replace(new RegExp($.config.origin.pid, 'g'), $.config.target.pid)
      .replace(new RegExp($.config.origin.host, 'g'), $.config.target.host)
    return JSON.parse(replacedStr)
  }
}