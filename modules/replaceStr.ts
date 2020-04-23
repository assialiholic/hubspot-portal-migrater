{
  // 任意の文字列で置換する
  module.exports = async function replaceStr(fn, arr: { [key: string]: any }[]) {
    const all: { [key: string]: any }[] = await fn()
    let replacedStr = JSON.stringify(all)
    arr.forEach(item => {
      replacedStr = replacedStr.replace(item.before, item.after)
    })
    return JSON.parse(replacedStr)
  }
}
