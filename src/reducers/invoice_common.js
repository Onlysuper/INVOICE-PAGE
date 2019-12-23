import { COMMON_INVOICE_RECORD } from '@constants/invoice_common'
const INITIAL_STATE = {
  storeInvoiceRecords:"zzzz"
}

export default function invoice_common (state = INITIAL_STATE, action) {
  switch (action.type) {
    case COMMON_INVOICE_RECORD: {
      return {
        ...state,
        storeInvoiceRecords:action.payload
      }
    }
    default:
      return state
  }
}
