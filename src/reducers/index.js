import { combineReducers } from 'redux'
import counter from './counter'
import invoice_electric from './invoice_electric'
import enterprise_search from './enterprise_search'
import invoice_common from './invoice_common'

export default combineReducers({
  counter,
  invoice_electric,
  enterprise_search,
  invoice_common
})
