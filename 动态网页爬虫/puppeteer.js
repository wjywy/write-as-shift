import puppeteer from 'puppeteer' // 木偶

const options = {
  defaultViewport: {
    width: 1920,
    height: 1080
  },
  // headless: true // 不打开浏览器
  headless: false // 打开浏览器
  // slowMo: 1000 // 慢慢加载
}
const browser = await puppeteer.launch(options) // 创建浏览器实例
const page = await browser.newPage() // 创建一个新的页面

const url = 'https://www.vcg.com/sets/516942437'

await page.goto(url) // 用await等待页面加载

// 定义一个网页加载函数

const loadHtml = cb =>
  new Promise((resolve, rejects) => {
    if (typeof cb !== 'function') throw new Error('cb 必须是函数')

    var timer
    // 3 秒后没有请求事件 resolve 结束该函数
    var timeout = () =>
      (timer = setTimeout(() => {
        resolve(true)
      }, 3000))

    // 页面发起请求触发该事件
    page.on('request', () => {
      // 先清除定时器
      clearTimeout(timer)
      // 再启动定时器
      timeout()

      // 这个方法是在浏览器执行的
      page.evaluate(cb => {
        const length = document.body.offsetHeight
        window.scrollTo(0, length + 500)

        // 重新运算求出参数的内容
        const fn = eval(cb)
        if (typeof fn === 'function') fn() // 如果是函数则执行函数
      }, `${cb}`)
    })
  })

// 等待网页加载完毕
await loadHtml(() => {
  const dom = document.querySelector('.jss50')
  dom && dom.click()
})

// 获取 img 标签列表
const imgUrlList = await page.$$eval('img', imgs => {
  let imgUrlList = []
  imgs.forEach(img => {
    const property = [...img.attributes] // 将img的属性转换为数组
    property.forEach(({ value }) => value.slice(0, 9).includes('//') && imgUrlList.push(value)) // 判断是否是url
  })
  const list = [...new Set(imgUrlList)].filter(i => i.indexOf('.svg', i.length - 9) == -1) // 去重
  const results = list.map(url => (/^http/.test(url) ? url : `https:${url}`))
  return results
})

console.log(imgUrlList)
console.log(imgUrlList.length)

await browser.close()
