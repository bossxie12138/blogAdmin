import axios from '../../utils/http'

export const getClassifyDatas = () => axios.get('/admin/getClassify')
export const addClassifyDatas = value => axios.post('/admin/addClassify', {value})
export const delClassifyDatas = key => axios.post('/admin/delClassify', {key})
export const editClassifyDatas = config => axios.post('/admin/editClassify', {config})
export const filterClassifyDatas = fields => axios.get('/admin/filterClassify', {params: {fields}})