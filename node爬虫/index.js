import cheerio from 'cheerio'
import axios from 'axios'
import path from 'path'
import fs from 'fs/promises'

const __dirname = path.resolve() // 文件目录绝对路径

// 参数 URL,文件路径(imgs得手动创建,子目录会自动创建)
imgDownload('https://699pic.com/?from=272&ref=www.91sotu.com', 'imgs/1')

// 图片爬取函数
async function imgDownload(url, _imgsDir) {
  const startTime = +new Date()
  let imgsList = [] // 图片url数组
  const imgsDir = path.join(__dirname, _imgsDir) // 图片目录

  try {
    // 获取网页数据并装载
    const { data } = await axios.get(url)
    const $ = cheerio.load(data) // 装载网页和jq语法差不多
    // 遍历img属性获取图片url
    $('img').each((index, { attribs: item } = e) => {
      for (const [k, v] of Object.entries(item)) {
        const isUrl = v.slice(0, 10).includes('//')
        if (isUrl) {
          imgsList.push(v)
        }
      }
    })

    // 定义下载函数
    const download = (url, filename) =>
      new Promise(async (resolve, reject) => {
        const imgPath = path.join(imgsDir, filename)
        try {
          // { responseType: 'arraybuffer' } 不加这个会乱码
          const { data: imgData } = await axios.get(url, { responseType: 'arraybuffer' })
          fs.writeFile(imgPath, imgData).then(() => resolve(imgPath + ' -> 下载成功'))
        } catch (err) {
          reject(`${imgPath} -> 下载失败: ${err.message} URL:${url}`)
        }
      })

    // 去重
    imgsList = [...new Set(imgsList)].filter(i => path.extname(i) != '.svg')

    // 判断 imgs 子目录是否存在,不存在则创建
    await fs.access(imgsDir).catch(() => fs.mkdir(imgsDir))

    // 下载函数 Promise数组
    const downloadList = imgsList.map((item, index) => {
      // 文件名
      const filename = (new Array(10).join('0') + index).slice(-6) + '.jpg'
      // 没有 https 协议的添加 https 协议
      if (item.startsWith('//')) {
        return download(`https:${item}`, filename)
      } else {
        return download(item, filename)
      }
    })

    // 异步并发
    const result = await Promise.allSettled(downloadList)
    // 输出结果
    result.forEach(item => console.log(item[Object.keys(item)[1]]))

    const endTime = +new Date()
    console.log('耗时：' + (endTime - startTime))
  } catch (err) {
    return console.log('错误 -> ' + err.message)
  }
}
