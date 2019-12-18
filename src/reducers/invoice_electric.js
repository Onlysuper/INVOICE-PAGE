import { INVOICE_ElECTRIC_ORDER,INVOICE_ENTERPRISE_NAME } from '@constants/invoice_electric'
const INITIAL_STATE = {
  invoice_order_state: {
  }, // 订单数据
  invoice_enterprise_state:{ // 搜索企业数据
    isSearch:false,
    name:"",
    tax:""
  }
}
export default function invoice_electric (state = INITIAL_STATE, action) {
  switch (action.type) {
    case INVOICE_ElECTRIC_ORDER: {
      return {
        ...state
        // invoice_order_state:action.payload
      }
    }
    case INVOICE_ENTERPRISE_NAME: {
      console.log('action',action)
      return {
        ...state,
        invoice_enterprise_state:action.payload
      }
    }

    default:
      return state
  }
}
