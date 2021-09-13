const path = require('path')
const defaultSettings = require('./src/settings.js')

const name = defaultSettings.title || '站点名称' // page title
const port = process.env.port || process.env.npm_config_port || 9520 // dev port

let outPutDir = "";
switch (process.env.ENV) {
  case "preview"://本地测试
    outPutDir = "D:\\WorkSpace\\YZC-Publish\\YZC.VUE.Preview";
    break;
  case "production"://生产环境
    outPutDir = "D:\\WorkSpace\\YZC-Publish\\YZC.VUE.Production";
    break;
  case "productionpreview": //生产演示环境
    outPutDir = "D:\\WorkSpace\\YZC-Publish\\YZC.VUE.ProductionPreview";
    break;
  default:
    outPutDir = "dist";
    break;
}

module.exports = {
  publicPath: '/',
  outputDir: outPutDir,
  lintOnSave: false,
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
}
