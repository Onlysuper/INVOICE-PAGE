import {
} from '@constants/apis'

import {
  INVOICE_ENTERPRISE_NAME
} from '@constants/enterprise_search'

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
