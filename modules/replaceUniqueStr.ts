{
  const config = require('../config.json')
  // ポータルIDとホストをターゲットポータルのものに書き換える
  async function replaceUniqueStr(fn) {
    const all: { [key: string]: any }[] = await fn()
    const replacedStr = JSON.stringify(all)
      .replace(new RegExp(config.origin.pid, 'g'), config.target.pid)
      .replace(new RegExp(config.origin.host, 'g'), config.target.host)
    return JSON.parse(replacedStr)
  }
  module.exports = replaceUniqueStr
}