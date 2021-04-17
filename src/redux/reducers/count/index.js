import { GET_COUNT } from '../../actionTypes'

const initialCount = {
  countObj: {}
}

export const countReducer = (state = initialCount, action) => {
  if (action.type === GET_COUNT) {
    return {
      countObj: action.data
    }
  } else {
    return state
  }
}