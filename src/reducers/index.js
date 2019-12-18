import { combineReducers } from 'redux'
import counter from './counter'
import invoice_electric from './invoice_electric'

export default combineReducers({
  counter,
  invoice_electric
})
