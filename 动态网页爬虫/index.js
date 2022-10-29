import axios from 'axios'
import path from 'path'
import fs from 'fs/promises'
import puppeteer from 'puppeteer' // 木偶

const __dirname = path.resolve() // 当前文件所在目录

// 定义下载函数
const download = (url, dir, filename) =>
  new Promise(async (resolve, reject) => {
    try {
      // { responseType: 'arraybuffer' } 不加这个会乱码
      const { data } = await axios.get(url, { responseType: 'arraybuffer' }) // 请求图片数据
      fs.writeFile(path.join(dir, filename), data).then(() => resolve(filename + ' -> 下载成功')) // 写入图片
    } catch ({ code }) {
      reject({ filename, url, code }) // 抛出错误
    }
  })

// 失败重试
Promise.retry = (fn, arg, count = 3) =>
  new Promise(async (resolve, reject) => {
    if (typeof fn !== 'function') reject(new Error('fn must be a function')) // 判断 fn 是否为函数
    if (!Array.isArray(arg)) reject(new Error('arg must be an array')) // 判断 arg 是否为数组
    let index = 0
    while (index < count) {
      try {
        resolve(await fn(...arg))
        return
      } catch (e) {
        index++
        if (index === count - 1) reject(e)
      }
    }
  })

// 图片下载函数
const imgDownloader = async (url, dir, count = 100, cb) => {
  if (cb && typeof cb !== 'function') throw new Error('cb must be a function')
  // 浏览器加载模块
  async function getImgUrl(url) {
    if (!url) throw new Error('url must be a string')
    const options = {
      defaultViewport: {
        width: 1920,
        height: 1080
      },
      headless: true // 不打开浏览器
      // headless: false // 打开浏览器
      // slowMo: 1000 // 慢慢加载
    }
    const browser = await puppeteer.launch(options) // 创建浏览器实例
    const page = await browser.newPage() // 创建一个新的页面

    try {
      await page.goto(url) // 加载页面
      // 定义加载方法
      const loadAll = () =>
        new Promise((resolve, reject) => {
          // 没有数据请求后3秒 resolve() 结束异步等候
          var timer
          var timeout = () => (timer = setTimeout(() => resolve(true), 3000))
          // 监听网页请求
          page.on('request', () => {
            clearTimeout(timer) // 清除定时器
            timeout() // 重新设置定时器
            // 网页下拉 这部分是在浏览器操作的    ！！！！！这方法不在node执行
            page.evaluate(cb => {
              const height = document.body.offsetHeight
              window.scrollTo(0, height + 500)

              try {
                const fn = eval(cb)
                if (typeof fn === 'function') fn()
              } catch (e) {
                console.log(e)
              }
            }, `${cb}`)
          })
        })

      console.log('开始加载网页数据...')
      await loadAll() // 加载全部页面 没有请求2秒后停止
      console.log('网页数据加载完毕！')

      // 获取图片地址
      const data = await page.$$eval('img', imgs => {
        let imgUrlList = []
        imgs.forEach(img => {
          const property = [...img.attributes] // 将img的属性转换为数组
          property.forEach(({ value }) => value.slice(0, 9).includes('//') && imgUrlList.push(value)) // 判断是否是url
        })
        return [...new Set(imgUrlList)].filter(i => i.indexOf('.svg', i.length - 9) == -1) // 去重
      })

      // 关闭浏览器
      await browser.close()
      const results = data.map(url => (/^http/.test(url) ? url : `https:${url}`)) // 判断是否是https协议
      return results // 返回结果
    } catch (e) {
      // 关闭浏览器
      console.log(e)
      await browser.close()
    }
  }

  // 尝试下载
  try {
    const urlList = await getImgUrl(url) // 获取图片下载地址列表
    await fs.access(dir).catch(() => fs.mkdir(dir, { recursive: true })) // 创建目录

    // 数组分片方法
    const slicing = (arr, count) => {
      if (!Array.isArray(arr)) throw new Error('arr must be an Array')
      if (typeof count !== 'number' || count < 1) throw new Error('count must be a number')

      let list = []
      for (let i = 0; i < arr.length; i += count) {
        list.push(arr.slice(i, i + count))
      }
      return list
    }

    // 下载列表
    const list = slicing(urlList, count)
    // 下载结果
    const results = []

    console.log(`${urlList.length}张照片待下载...`)
    const startTime = new Date() // 开始时间

    // 开始分片下载
    for (let i = 0; i < list.length; i++) {
      console.log(`开始下载 -> ${(i + 1) * count}`)
      const downloadList = list[i].map((item, index) => {
        // 文件名
        const filename = (new Array(10).join('0') + (i * count + index)).slice(-6) + '.jpg'
        return Promise.retry(download, [item, dir, filename])
      })
      const res = await Promise.allSettled(downloadList)
      results.push(...res)
    }

    // 输出下载结果
    results.forEach(({ value, reason }) => console.log(value || reason))

    // 输出结束时间
    const endTime = new Date() // 结束时间
    console.log('下载完成 -> 耗时:' + (endTime - startTime) / 1000 + 's') // 耗时
  } catch (e) {
    console.error(e)
  }
}

// const url =
//   'https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=&sf=1&fmq=1652366997889_R&pv=&ic=&nc=1&z=&hd=&latest=&copyright=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&dyTabStr=MCwzLDEsNCw1LDcsOCwyLDYsOQ%3D%3D&ie=utf-8&sid=&word=%E9%A3%8E%E6%99%AF'

const url = 'https://www.vcg.com/sets/516942437'

const dir = path.join(__dirname, 'imgs/img1') // 图片存储目录

// 第一个参数 要爬取网站的地址
// 第二个参数 图片存储目录
// 第三个参数 分片下载数量
// 第四个参数 回调函数用于浏览器操作
imgDownloader(url, dir, 200, () => {
  const dom = document.querySelector('.jss50')
  dom && dom.click()
})
