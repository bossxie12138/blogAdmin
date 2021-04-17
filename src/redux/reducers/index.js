import { combineReducers } from 'redux'
import { collectReducer } from './collection'
import { classifyReducer } from './classify'
import { articleReducer } from './article'
import { countReducer } from './count'
import { chartsReducer } from './charts'
import { userReducer } from './user'
import { messagesReducer } from './messages'

const rootReducer = combineReducers({
  collectReducer,
  classifyReducer,
  articleReducer,
  countReducer,
  chartsReducer,
  userReducer,
  messagesReducer
})

export default rootReducer