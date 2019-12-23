import {
  API_INVOICE_ElECTRIC_ORDER, //电子发票订单信息
  API_INVOICE_ElECTRIC_RECORD, //根据openid获取开票记录
  API_INVOICE_ElECTRIC_PAYMENT //开电子发票
} from '@constants/apis'

import {
  INVOICE_ElECTRIC_ORDER,
  INVOICE_ElECTRIC_RECORD,
  INVOICE_ElECTRIC_PAYMENT
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
 * 根据openid获取已开电子发票记录
 * @param {*} payload
 */
export const dispatchInvoiceRecord = payload => createAction({
  type: INVOICE_ElECTRIC_RECORD,
  url: API_INVOICE_ElECTRIC_RECORD,
  payload,
  fetchOptions:{
    needAllCode:true
  }
})


// 开电子发票
export const dispatchInvoicePayment = payload => createAction({
  type: INVOICE_ElECTRIC_PAYMENT,
  url: API_INVOICE_ElECTRIC_PAYMENT,
  payload
})







