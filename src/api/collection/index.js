import axios from '../../utils/http'

export const getCollectDatas = () => axios.get('/admin/getCollection')
export const addCollectDatas = value => axios.post('/admin/addCollection', value)
export const delCollectDatas = key => axios.post('/admin/delCollection', {key})
export const editCollectDatas = config => axios.post('/admin/editCollection', {config})
export const filterCollectDatas = fields => axios.get('/admin/filterCollection', {params: {fields}})