import jwtDecode from 'jwt-decode'
import {
  ADD_CLASSIFY,
  DEL_CLASSIFY,
  EDIT_CLASSIFY,
  GET_CLASSIFY,
  FILTER_CLASSIFY,
  ADD_ARTICLE,
  DEL_ARTICLE,
  EDIT_ARTICLE,
  GET_ARTICLE,
  FILTER_ARTICLE,
  ADD_COLLECTION,
  DEL_COLLECTION,
  EDIT_COLLECTION,
  GET_COLLECTION,
  FILTER_COLLECTION,
  GET_COUNT,
  GET_CHARTS,
  LOGIN_ADMIN,
  CLEAR_LOGIN,
  GET_MSGlIST,
  REPLY_MSG,
  EDIT_USER
} from './actionTypes'
import {
  addCollectDatas,
  delCollectDatas,
  getCollectDatas,
  editCollectDatas,
  filterCollectDatas,
  getClassifyDatas,
  addClassifyDatas,
  delClassifyDatas,
  editClassifyDatas,
  filterClassifyDatas,
  addArticleDatas,
  delArticleDatas,
  editArticleDatas,
  getArticleDatas,
  filterArticleDatas,
  getCountDatas,
  getChartsDatas,
  adminLogin,
  getMsgList,
  replyMsg,
  editUser
} from '../api'
import { message } from 'antd'
import jwt from 'jsonwebtoken'
import { config } from '../utils'

// collection
export const addCollect = value => {
  return async dispatch => {
    let { data } = await addCollectDatas(value)
    dispatch({ data, type: ADD_COLLECTION })
  }
}
export const delCollect = key => {
  return async dispatch => {
    let { data } = await delCollectDatas(key)
    dispatch({ data, type: DEL_COLLECTION })
  }
}
export const editCollect = config => {
  return async dispatch => {
    let { data } = await editCollectDatas(config)
    dispatch({ data, type: EDIT_COLLECTION })
  }
}
export const getCollect = () => {
  return async dispatch => {
    const { data } = await getCollectDatas()
    dispatch ({ data, type: GET_COLLECTION })
  }
}
export const filterCollect = value => {
  return async dispatch => {
    let { data } = await filterCollectDatas(value)
    let result = data[0]
    dispatch({ data: result, type: FILTER_COLLECTION })
  }
}

// classify
export const addClassify = value => {
  return async dispatch => {
    let { data } = await addClassifyDatas(value)
    dispatch({ data, type: ADD_CLASSIFY })
  }
}
export const delClassify = key => {
  return async dispatch => {
    let { data } = await delClassifyDatas(key)
    dispatch({ data, type: DEL_CLASSIFY })
  }
}
export const editClassify = config => {
  return async dispatch => {
    let { data } = await editClassifyDatas(config)
    dispatch({ data, type: EDIT_CLASSIFY })
  }
}
export const getClassify = () => {
  return async dispatch => {
    let { data } = await getClassifyDatas()
    dispatch({ data, type: GET_CLASSIFY })
  }
}
export const filterClassify = value => {
  return async dispatch => {
    let { data } = await filterClassifyDatas(value)
    dispatch({ data: data[0], type: FILTER_CLASSIFY })
  }
}

// article
export const addArticle = value => {
  return async dispatch => {
    let { data } = await addArticleDatas(value)
    dispatch({ data, type: ADD_ARTICLE })
  }
}
export const delArticle = key => {
  return async dispatch => {
    let { data } = await delArticleDatas(key)
    dispatch({ data, type: DEL_ARTICLE })
  }
}
export const editArticle = (id, record) => {
  return async dispatch => {
    let { data } = await editArticleDatas(id, record)
    dispatch({ data, type: EDIT_ARTICLE })
  }
}
export const getArticle = () => {
  return async dispatch => {
    let { data } = await getArticleDatas()
    dispatch({ data, type: GET_ARTICLE })
  }
}
export const filterArticle = value => {
  return async dispatch => {
    let { data } = await filterArticleDatas(value)
    dispatch({ data: data[0], type: FILTER_ARTICLE })
  }
}

// count
export const getCount = () => {
  return async dispatch => {
    let { data } = await getCountDatas()
    let { totalData, users, msgs } = data
    let likeArr = []
    let lookArr = []
    let commentArr = []
    if (totalData.length) {
      totalData.forEach(item => {
        likeArr.push(item.like)
        lookArr.push(item.look)
        commentArr.push(item.commentList)
      })
    }
    let like = likeArr.reduce((pre,next) => pre + next)
    let look = lookArr.reduce((pre,next) => pre + next)
    let newCommentArr = commentArr.filter(item => item !== null)
    .map(item => item.split('|')).flat(Infinity)
    .map(item => JSON.parse(item))
    const previewData = {
      like,
      look,
      comment:newCommentArr.length,
      userNum: users.length,
      msg:msgs.length
    }
    dispatch({ data: previewData, type: GET_COUNT })
    // console.log(`点赞数：${like};浏览数：${look};评论数：${newCommentArr.length};用户数：${users.length};留言数：${msgs.length}`);
  }
}

// charts
export const getCharts = () => {
  return async dispatch => {
    let { data } = await getChartsDatas()
    dispatch({ data, type: GET_CHARTS })
  }
}

// user
export const login = value => {
  return async dispatch => {
    let result = await adminLogin(value)
    if (result.token) {
      localStorage.setItem('jwtToken', result.token)
      let userInfo = jwtDecode(result.token)
      dispatch({ data: userInfo, type: LOGIN_ADMIN })
      message.success('登录成功！')
    }
    else {
      message.error(result)
    }
  }
}
export const clearUser = () => ({ type: CLEAR_LOGIN })
export const editUserAction = value => {
  return async dispatch => {
    let { data } = await editUser(value)
    const token = jwt.sign({
      key: data[0].key,
      username: data[0].username,
      role: data[0].role,
      nickname: data[0].nickname,
      avatar: data[0].avatar,
      email: data[0].email,
      password: data[0].password
    }, config.jwtSecret)
    localStorage.setItem('jwtToken', token)
    dispatch({ data: data[0], type: EDIT_USER })
  }
}


// messages
export const getMsgLists = () => {
  return async dispatch => {
    let { data } = await getMsgList()
    dispatch({ data, type: GET_MSGlIST })
  }
}
export const replyAction = value => {
  return async dispatch => {
    let { data } = await replyMsg(value)
    dispatch({ data, type: REPLY_MSG })
  }
}
