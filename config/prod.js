// const isH5 = process.env.CLIENT_ENV === 'h5'
const isH5 = process.env.TARO_ENV === 'h5'
const HOST = '"http://ti.sptong.cn"'
const HOST_H5 = '"api"'

const HOST_M = '"https://miniapp.you.163.com"'
const HOST_M_H5='"api-m"'
module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    HOST:isH5 ? HOST_H5 : HOST,
    HOST_M: isH5 ? HOST_M_H5 : HOST_M,
  },
  weapp: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
