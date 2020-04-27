{
  // 任意の文字列で置換する
  module.exports = function replaceStr(
    target: { [key: string]: any }[],
    arr: { [key: string]: string }[]
  ) {
    let replacedStr = JSON.stringify(target)
    arr.forEach(item => {
      replacedStr = replacedStr.replace(
        new RegExp(item.before, 'g'),
        item.after
      )
    })
    return JSON.parse(replacedStr)
  }
}
