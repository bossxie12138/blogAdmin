import axios from '../../utils/http'

export const getMsgList = () => axios.get('/admin/getMsg')
export const replyMsg = value => axios.post('/admin/replyMsg', {value})
