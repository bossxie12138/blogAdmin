import axios from '../../utils/http'

export const getCountDatas = () => axios.get('/admin/getCount')
