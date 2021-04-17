import React from 'react'
import { Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import './index.less'

export default function NotFound(props) {
  return (
    <div className="not-found">
      <div className="wrap-404">
        <div className="header-404">404NotFound<hr /></div>
        <div className="content">
         <p>
           {`抱歉，您访问的内容似乎出现了点问题！
           有可能是所访问的资源不存在，如果是资源出现了问题，我们会尽快修复。`}
          </p>
        </div>
        <div className="footer-menu">
        <ArrowRightOutlined />
        <Button type="link" onClick={() => props.history.push('/')}>
          点我返回首页！
        </Button>
        </div>
      </div>
    </div>
  )
}
