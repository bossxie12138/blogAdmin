import React from 'react'
import { Spin } from 'antd'
import './index.less'

export default function MyLoading() {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  )
}
