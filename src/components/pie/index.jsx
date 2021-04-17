import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pie } from '@ant-design/charts'
import { getCharts } from '../../redux/actionCreators'

export default function MyPie() {
  const dispatch = useDispatch()

  const charts = useSelector(state => state.chartsReducer.chartsObj)
  
  useEffect(() => {
    dispatch(getCharts())
  }, [dispatch])

  const config = {
    appendPadding: 10,
    data: charts,
    angleField: 'count',
    colorField: 'classify',
    radius: 0.8,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}'
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }]
  }
  return <Pie {...config}/>
}
