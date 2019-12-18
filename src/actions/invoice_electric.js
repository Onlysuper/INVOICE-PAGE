import {
  API_INVOICE_ElECTRIC_ORDER,
  API_INVOICE_ENTERPRISE_NAME
} from '@constants/apis'

import {
  INVOICE_ElECTRIC_ORDER,
  INVOICE_ENTERPRISE_NAME
} from '@constants/invoice_electric'

import { createAction } from '@utils/redux'

/**
 * 电子发票订单查询
 * @param {*} payload
 */
export const dispatchInvoiceOrder = payload => createAction({
  type: INVOICE_ElECTRIC_ORDER,
  url: API_INVOICE_ElECTRIC_ORDER,
  payload,
  fetchOptions:{
    needAllCode:true
  }
})

/**
 * 企业名称模糊搜索
 * @param {*} payload
 */
export const InvoiceEnterprise=(value)=>{
  return {
    type:INVOICE_ENTERPRISE_NAME,
    payload:{
      isSearch:true,
      name:value,
      tax:"balabla"
    }
  }
}
export const InvoiceEnterpriseReset=(value)=>{
  return {
    type:INVOICE_ENTERPRISE_NAME,
    payload:{
      isSearch:false,
      name:"",
      tax:""
    }
  }
}
export const dispatchInvoiceEnterprise = (value) => InvoiceEnterprise(value)
export const dispatchInvoiceEnterpriseReset = () => InvoiceEnterpriseReset()




