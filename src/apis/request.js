import Taro from '@tarojs/taro'
import { HTTP_STATUS } from './status'
import { base } from './config'
import { logError } from './logError'
const token = ''

export default {
  baseOptions(params, method = 'GET') {
    return new Promise(function (resolve, reject) {
      let { url, data } = params
      let contentType = 'application/x-www-form-urlencoded'
      contentType = params.contentType || contentType
      const option = {
        isShowLoading: false,
        loadingText: '正在加载',
        url: base + url,
        data: data,
        method: method,
        header: { 
          'content-type': contentType
        },
        success(res) {
          if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
            // return logError('api', '请求资源不存在')
            reject('api', '请求资源不存在');
          } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
            reject('api', '服务端出现了问题');
            // return logError('api', '服务端出现了问题')
          } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
            reject('api', '没有权限访问');
            // return logError('api', '没有权限访问')
          } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
            console.log('这里了',res.data);
            resolve(res.data);
            // return res.data
          }
        },
        error(e) {
          logError('api', '请求接口出现问题', e)
        }
      }
       Taro.request(option)
    })
  },
  get(url, data = '') {
    let option = { url, data,contentType:"application/json;charset=UTF-8"}
    return this.baseOptions(option)
  },
  post: function (url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  }
}
