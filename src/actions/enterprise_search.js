import { createAction } from '@utils/redux'
import {
  API_INVOICE_ENTERPRISE_NAME, // 企业名称模糊搜索企业
} from '@constants/apis'

import {
  ENTERPRISE_SEARCH
} from '@constants/enterprise_search'

/**
 * 企业选择
 * @param {*} payload
 */
export const EnterpriseSelected=(value)=>{
  return {
    type:ENTERPRISE_SEARCH,
    payload:{
      isSearch:true,
      name:value,
      tax:"balabla"
    }
  }
}
// 重置企业信息
export const EnterpriseReset=(value)=>{
  return {
    type:ENTERPRISE_SEARCH,
    payload:{
      isSearch:false,
      name:"",
      tax:""
    }
  }
}
/**
 * 企业名称模糊搜索
 * @param {*} payload
 */
export const dispatchEnterpriseSearch = payload => {
  let {randomCode,key}=payload;
  return createAction({
    type: ENTERPRISE_SEARCH,
    url: `${API_INVOICE_ENTERPRISE_NAME}${randomCode}/${key}`,
    // url: `${API_INVOICE_ENTERPRISE_NAME}`,
    payload,
    fetchOptions:{
      needAllCode:true
    }
  })
}
// createAction({
//   let {randomCode,key}=payload;
//   type: ENTERPRISE_SEARCH,
//   url: `${API_INVOICE_ENTERPRISE_NAME}/${randomCode}/${key}`,
//   payload,
//   fetchOptions:{
//     needAllCode:true
//   }
// })
export const dispatchEnterpriseSelected = (value) => EnterpriseSelected(value)
export const dispatchEnterpriseReset = () => EnterpriseReset()
