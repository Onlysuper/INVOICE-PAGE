import {
  ADD,
  MINUS
} from '../constants/counter'

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}




// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}


export const mytest = () => {
  return {
    type: 'MYTEST'
  }
}

// 异步的action
export function asyncMytest () {
  return dispatch => {
    setTimeout(() => {
      dispatch(mytest())
    }, 2000)
  }
}
