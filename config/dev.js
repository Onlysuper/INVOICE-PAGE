// const isH5 = process.env.CLIENT_ENV === 'h5'
const isH5 = process.env.TARO_ENV === 'h5'
console.log('isH5',isH5);
const HOST = '"http://ti.sptong.cn"'
const HOST_H5 = '"api"'


const HOST_M = '"http://i.sptong.cn"'
const HOST_M_H5='"api-m"'
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  weapp: {},
  defineConstants: {
    HOST: isH5 ? HOST_H5 : HOST,
    HOST_M: isH5 ? HOST_M_H5 : HOST_M,
  },
  h5: {
    devServer: {
      proxy: {
        '/api/': {
          target: JSON.parse(HOST),
          pathRewrite: {
            '^/api/': '/'
          },
          changeOrigin: true
        },
        '/api-m/': {
          target: JSON.parse(HOST_M),
          pathRewrite: {
            '^/api-m/': '/'
          },
          changeOrigin: true
        }
      }
    }
  }
}
