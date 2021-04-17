import {
  GET_COLLECTION,
  ADD_COLLECTION,
  DEL_COLLECTION,
  EDIT_COLLECTION,
  FILTER_COLLECTION
} from '../../actionTypes'

const initialCollect = {
  collectList: []
}

export const collectReducer = (state = initialCollect, action) => {
  switch (action.type) {
    case GET_COLLECTION:
      return {
        collectList: action.data
      }
    case ADD_COLLECTION:
      return {
        collectList: action.data
      }
    case DEL_COLLECTION:
      return {
        collectList: action.data
      }
    case EDIT_COLLECTION:
      return {
        collectList: action.data
      }
    case FILTER_COLLECTION:
      return {
        collectList: action.data
      }
    default:
      return state
  }
}