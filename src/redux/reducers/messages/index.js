import { GET_MSGlIST, REPLY_MSG } from '../../actionTypes'

const initialMsg = {
  messagesList: [],
  reply: {}
}

export const messagesReducer = (state = initialMsg, action) => {
  switch (action.type) {
    case GET_MSGlIST:
      return {
        messagesList: action.data
      }
    case REPLY_MSG:
      return {
        ...state,
        reply: action.data
      }
    default:
      return state
  }
}