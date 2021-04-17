import {
  ADD_ARTICLE,
  DEL_ARTICLE,
  EDIT_ARTICLE,
  GET_ARTICLE,
  FILTER_ARTICLE
} from '../../actionTypes'

const initialArticle = {
  articleList: []
}

export const articleReducer = (state = initialArticle, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return {
        articleList: action.data
      }
    case DEL_ARTICLE:
      return {
        articleList: action.data
      }
    case EDIT_ARTICLE:
      return {
        articleList: action.data
      }
    case GET_ARTICLE:
      return {
        articleList: action.data
      }
    case FILTER_ARTICLE:
      return {
        articleList: action.data
      }
    default:
      return state
  }
}