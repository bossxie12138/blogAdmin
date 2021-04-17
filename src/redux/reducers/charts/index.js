import { GET_CHARTS } from '../../actionTypes'

const initialCharts = {
  chartsObj: []
}

export const chartsReducer = (state = initialCharts, action) => {
  if (action.type === GET_CHARTS) {
    return {
      chartsObj: action.data
    }
  } else {
    return state
  }
}