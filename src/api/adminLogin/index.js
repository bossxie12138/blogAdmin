import axios from '../../utils/http'

export const adminLogin = value => axios.post('/admin/login', {value})
export const editUser = value => axios.post('/admin/editUser', value)