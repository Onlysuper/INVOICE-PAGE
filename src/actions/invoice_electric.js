import {
  INVOICE_ElECTRIC_ORDER
} from '@constants/invoice_electric'

import {
  API_INVOICE_ElECTRIC_ORDER
} from '@constants/apis'
import { createAction } from '@utils/redux'

/**
 * 电子发票订单查询
 * @param {*} payload
 */
export const dispatchInvoiceOrder = payload => createAction({
  url: API_INVOICE_ElECTRIC_ORDER,
  type: INVOICE_ElECTRIC_ORDER,
  payload,
  fetchOptions:{
    needAllCode:true
  }
})




