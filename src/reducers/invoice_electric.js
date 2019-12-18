import { INVOICE_ElECTRIC_ORDER } from '@constants/invoice_electric'
const INITIAL_STATE = {
  invoice_order_state: {

  }
}
export default function invoice_electric (state = INITIAL_STATE, action) {
  switch (action.type) {
    case INVOICE_ElECTRIC_ORDER: {
      return {
        ...state,
        invoice_order_state:action.payload
      }
    }
    default:
      return state
  }
}
