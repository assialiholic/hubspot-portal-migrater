{
  const CommonMethods = require('./class/CommonMethods.js')
  const $ = new CommonMethods()
  const getPages = require('./modules/getPages.js')
  const replaceStr = require('./modules/replaceStr.js')
  const updatePages = require('./modules/updatePages.js')

  async function returnPageIdObj(targetPages) {
    const originPages = await getPages('origin')
    let pageIdObj = {}
    originPages.forEach(page => {
      pageIdObj[page.name] = {
        originId: page.id,
      }
    })

    targetPages.forEach(page => {
      if (pageIdObj.hasOwnProperty(page.name)) {
        pageIdObj[page.name].targetId = page.id
      }
    })
    return pageIdObj
  }

  async function updateTargetPages(targetPages) {
    const pageIdObj = await returnPageIdObj(targetPages)
    // 念のためファイル出力（動作チェックに使ったり）
    $.backup(pageIdObj, 'pageIdObj', 'js')

    const replaceArr = Object.keys(pageIdObj).map(key => {
      return {
        before: pageIdObj[key].originId,
        after: pageIdObj[key].targetId,
      }
    })

    const replacedJson = replaceStr(targetPages, replaceArr)
    updatePages(replacedJson, 0)
  }

  ;(async () => {
    return await getPages('target')
  })().then(targetPages => {
    updateTargetPages(targetPages)
  })
}
