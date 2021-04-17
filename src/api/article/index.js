import axios from '../../utils/http'

export const getArticleDatas = () => axios.get('/admin/getArticle')
export const addArticleDatas = value => axios.post('/admin/addArticle', {value})
export const delArticleDatas = key => axios.post('/admin/delArticle', {key})
export const editArticleDatas = (id, record) => axios.post('/admin/editArticle', {id, record})
export const filterArticleDatas = fields => axios.get('/admin/filterArticle', {params: {fields}})
export const getArticleById = async id => {
  let { data } = await axios.get('/admin/getArticleById', { params: {id} })
  return data
}