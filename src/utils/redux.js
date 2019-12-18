/**
 * 适当封装 Redux，简化调用
 */
/* eslint-disable import/prefer-default-export */
import fetch from '@utils/request'

export function createAction(options) {
  /**
  *
  * @param {} fetchOptions  特殊配置信息
  * needAllCode需要所有code
  */

  const { url, payload, method, fetchOptions, cb, type } = options
  return (dispatch) => {
    return fetch({ url, payload, method, ...fetchOptions }).then((res) => {
      dispatch({ type, payload: cb ? cb(res) : res })
      return res
    })
  }
}
