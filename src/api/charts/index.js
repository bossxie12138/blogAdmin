import axios from '../../utils/http'

export const getChartsDatas = () => axios.get('/admin/getCharts')
