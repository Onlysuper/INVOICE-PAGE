// const isH5 = process.env.CLIENT_ENV === 'h5'
const HOST = '"http://ti.sptong.cn"'
const HOST_M = '"https://miniapp.you.163.com"'
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  weapp: {},
  defineConstants: {
    HOST: '"/api"',
    HOST_M: '"/api-m"'
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
