import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { MyUpLoad } from '../../components'
import { clearUser, editUserAction } from '../../redux/actionCreators'
import { md5 } from '../../utils'
import './index.less'

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16,
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
}

export default function UserInfo() {
  const [pwdConfirm, setPwdConfirm] = useState('') // 确认密码

  const dispatch = useDispatch()

  const userMsg = useSelector(state => state.userReducer.userInfo)

  const history = useHistory()
 
  const onFinish = values => {
    if (userMsg.role !== '001') {
      message.error('没有权限进行此操作！')
      return
    }
    if (values.password===undefined) {
      dispatch(editUserAction(values))
    }else {
      let jwtConfig = {
        ...values,
        password: md5(values.password, userMsg.username)
      }
      if (values.password===pwdConfirm) {
        dispatch(editUserAction(jwtConfig))
        message.error('身份已过期请重新登录！')
        setTimeout(() => {
          history.push('/login')
          dispatch(clearUser())
          localStorage.removeItem('jwtToken')
        }, 1000);
      } else { message.error('两次密码输入不一致！') }
    }
  }

  const onFinishFailed = errorInfo =>  message.error(errorInfo)

  const changeConfirm = e => setPwdConfirm(e.target.value)
  
  return (
    <div className="user-info">
      <div className="wrap-upload">
        <MyUpLoad title="上传头像" />
      </div>
      <div className="wrap-form">
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="确认密码">
            <Input.Password value={pwdConfirm} onChange={changeConfirm} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button className="sub-btn" type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
