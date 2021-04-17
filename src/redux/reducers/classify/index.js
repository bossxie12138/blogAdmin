import {
  ADD_CLASSIFY,
  DEL_CLASSIFY,
  EDIT_CLASSIFY,
  GET_CLASSIFY,
  FILTER_CLASSIFY
} from '../../actionTypes'

const initialClassify = {
  classifyList: []
}

export const classifyReducer = (state = initialClassify, action) => {
  switch (action.type) {
    case ADD_CLASSIFY:
      return {
        classifyList: action.data
      }
    case DEL_CLASSIFY:
      return {
        classifyList: action.data
      }
    case EDIT_CLASSIFY:
      return {
        classifyList: action.data
      }
    case GET_CLASSIFY:
      return {
        classifyList: action.data
      }
    case FILTER_CLASSIFY:
      return {
        classifyList: action.data
      }
    default:
      return state
  }
}