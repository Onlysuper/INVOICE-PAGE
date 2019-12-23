import {
} from '@constants/apis'

import {
  COMMON_INVOICE_RECORD,
} from '@constants/invoice_common'

import { createAction } from '@utils/redux'

/**
 * 选择按钮需要开票记录
 * @param {*} payload
 */
export const commonInvoiceRecord = payload=>{
  return {
    type:COMMON_INVOICE_RECORD,
    payload
  }
}





