import { createAction } from '@utils/redux'
import {
  API_INVOICE_ENTERPRISE_NAME, // 企业名称模糊搜索企业
  API_INVOICE_ENTERPRISE_NAME_HX //航信搜索企业名称
} from '@constants/apis'

import {
  ENTERPRISE_SEARCH,
  ENTERPRISE_SEARCH_TEST
} from '@constants/enterprise_search'


/**
 * 企业名称模糊搜索
 * @param {*} payload
 */
export const dispatchEnterpriseSearch = (payload,params) => {
  let {randomCode,key}=params;
  return createAction({
    type: ENTERPRISE_SEARCH,
    url: `${API_INVOICE_ENTERPRISE_NAME}/${randomCode}/${key}`,
    payload,
    fetchOptions:{
      needAllCode:true
    }
  })
}


// 普通企业选中
export const enterpriseReturn_ELASTIC= (enterprise) => {
  return {
    type:ENTERPRISE_SEARCH,
    payload:{
      isSearch:true,
      ...enterprise
    }
  }
}

// 航信企业选中
export const enterpriseReturn_HX=(payload)=>{
  createAction({
    type: ENTERPRISE_SEARCH,
    url: `${API_INVOICE_ENTERPRISE_NAME_HX}`,
    payload
  }).then((enterprise)=>{
    return {
      payload:{
        isSearch:true,
        ...enterprise
      }
    }
  })
}

// 选中企业
export const dispatchEnterpriseSelected = (enterprise) => {
  return dispatch => {
    if(enterprise.type==='ELASTIC'){
      // 普通企业搜索
      dispatch(enterpriseReturn_ELASTIC(enterprise))
    } else {
      //航信企业搜索
      dispatch(enterpriseReturn_HX({
        taxNo: enterprise.code
      }))
    }
  }
}

// 重置企业信息
export const dispatchEnterpriseReset = ()=>{
  return {
    type:ENTERPRISE_SEARCH,
    payload:{
      isSearch:false,
      name:"",
      tax:""
    }
  }
}

// 测试
export const dispatchEnterpriseTest = ()=>{
  return dispatch => {
    setTimeout(() => {
      dispatch((function(){
       return{
        type:ENTERPRISE_SEARCH_TEST
       }
      })())
    }, 2000)
  }
}


